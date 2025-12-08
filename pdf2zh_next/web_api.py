"""
FastAPI web server for PDFMathTranslate with multi-user authentication.

This module provides REST API endpoints for:
- User authentication (login, logout, registration)
- File upload and translation
- Settings management
- Translation history
"""

import asyncio
import json
import logging
import uuid
from datetime import datetime
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from pdf2zh_next.auth import UserManager, AuthenticationError
from pdf2zh_next.config import ConfigManager
from pdf2zh_next.config.model import SettingsModel
from pdf2zh_next.config.translate_engine_model import TRANSLATION_ENGINE_METADATA_MAP
from pdf2zh_next.high_level import do_translate_async_stream
from pdf2zh_next.const import __version__

logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="PDFMathTranslate API", version="2.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize user manager
user_manager = UserManager()

# In-memory storage for active translation tasks
active_tasks = {}


# Pydantic models for request/response
class SetupRequest(BaseModel):
    username: str
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str


class RegisterRequest(BaseModel):
    username: str
    password: str


class ChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str


class TranslationSettings(BaseModel):
    service: str
    lang_from: str = "English"
    lang_to: str = "Simplified Chinese"
    # Add other settings as needed


# Dependency to get current user from token
async def get_current_user(authorization: Optional[str] = Header(None)) -> dict:
    """Validate authentication token and return current user"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace("Bearer ", "")
    user_data = user_manager.validate_token(token)
    
    if not user_data:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    return user_data


async def get_admin_user(current_user: dict = Depends(get_current_user)) -> dict:
    """Ensure current user is an admin"""
    if not current_user.get('is_admin'):
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return current_user


def build_settings_model_from_user_config(user_settings: dict, output_dir: Path, pages: str = None) -> SettingsModel:
    """Build SettingsModel from user's saved settings"""
    from pdf2zh_next.config.translate_engine_model import (
        OpenAISettings, AzureOpenAISettings, GeminiSettings, DeepLSettings,
        OllamaSettings, SiliconFlowSettings, DeepSeekSettings,
        SiliconFlowFreeSettings, ZhipuSettings, AnythingLLMSettings,
        ClaudeCodeSettings, BingSettings, GoogleSettings, TencentSettings
    )
    
    # Get translation service from user settings
    service = user_settings.get('service', 'SiliconFlowFree')
    
    # Map service name to engine settings
    engine_settings = None
    
    if service == 'OpenAI':
        engine_settings = OpenAISettings(
            openai_model=user_settings.get('openai_model', 'gpt-4o-mini'),
            openai_api_key=user_settings.get('openai_api_key', ''),
            openai_base_url=user_settings.get('openai_base_url', 'https://api.openai.com/v1'),
        )
    elif service == 'AzureOpenAI':
        engine_settings = AzureOpenAISettings(
            azure_openai_api_key=user_settings.get('azure_openai_api_key', ''),
            azure_openai_base_url=user_settings.get('azure_openai_base_url', ''),
            azure_openai_model=user_settings.get('azure_openai_model', ''),
            azure_openai_api_version=user_settings.get('azure_openai_api_version', '2024-02-15-preview'),
        )
    elif service in ('Gemini', 'GoogleGemini'):
        engine_settings = GeminiSettings(
            gemini_model=user_settings.get('gemini_model', 'gemini-1.5-flash'),
            gemini_api_key=user_settings.get('gemini_api_key', ''),
        )
    elif service == 'DeepL':
        engine_settings = DeepLSettings(
            deepl_auth_key=user_settings.get('deepl_api_key', ''),
        )
    elif service == 'Ollama':
        engine_settings = OllamaSettings(
            ollama_model=user_settings.get('ollama_model', 'gemma2'),
            ollama_host=user_settings.get('ollama_host', 'http://127.0.0.1:11434'),
        )
    elif service == 'SiliconFlow':
        engine_settings = SiliconFlowSettings(
            siliconflow_model=user_settings.get('siliconflow_model', 'Qwen/Qwen2.5-7B-Instruct'),
            siliconflow_api_key=user_settings.get('siliconflow_api_key', ''),
        )
    elif service == 'DeepSeek':
        engine_settings = DeepSeekSettings(
            deepseek_model=user_settings.get('deepseek_model', 'deepseek-chat'),
            deepseek_api_key=user_settings.get('deepseek_api_key', ''),
        )
    elif service == 'Zhipu':
        engine_settings = ZhipuSettings(
            zhipu_model=user_settings.get('zhipu_model', 'glm-4-flash'),
            zhipu_api_key=user_settings.get('zhipu_api_key', ''),
        )
    elif service == 'Claude':
        engine_settings = ClaudeCodeSettings(
            claudecode_model=user_settings.get('claude_model', 'claude-sonnet-4-20250514'),
            claudecode_api_key=user_settings.get('claude_api_key', ''),
        )
    elif service == 'Bing':
        engine_settings = BingSettings()
    elif service == 'Google':
        engine_settings = GoogleSettings()
    elif service == 'Tencent':
        engine_settings = TencentSettings(
            tencentcloud_secret_id=user_settings.get('tencent_secret_id', ''),
            tencentcloud_secret_key=user_settings.get('tencent_secret_key', ''),
        )
    else:
        # Default to SiliconFlowFree (also handles 'SiliconFlowFree' and 'DeepLX' which doesn't exist)
        engine_settings = SiliconFlowFreeSettings()
    
    # Build SettingsModel
    settings = SettingsModel(
        translate_engine_settings=engine_settings,
        report_interval=0.5,
    )
    
    # Configure translation settings
    settings.translation.lang_in = user_settings.get('lang_from', 'en')
    settings.translation.lang_out = user_settings.get('lang_to', 'zh')
    settings.translation.output = str(output_dir)
    settings.translation.ignore_cache = user_settings.get('ignore_cache', False)
    settings.translation.qps = user_settings.get('custom_qps', user_settings.get('qps', 4))
    
    # Additional translation settings
    min_text_length = user_settings.get('min_text_length', 5)
    if min_text_length:
        settings.translation.min_text_length = min_text_length
    
    rpc_doclayout = user_settings.get('rpc_doclayout', '')
    if rpc_doclayout:
        settings.translation.rpc_doclayout = rpc_doclayout
    
    custom_prompt = user_settings.get('custom_system_prompt', '')
    if custom_prompt:
        settings.translation.custom_system_prompt = custom_prompt
    
    primary_font = user_settings.get('primary_font', '')
    if primary_font and primary_font != 'auto':
        settings.translation.primary_font_family = primary_font
    
    # Worker pool settings
    custom_workers = user_settings.get('custom_workers', 0)
    if custom_workers and custom_workers > 0:
        settings.translation.pool_max_workers = custom_workers
    
    # Term extraction settings
    settings.translation.no_auto_extract_glossary = not user_settings.get('enable_term_extraction', False)
    settings.translation.save_auto_extracted_glossary = user_settings.get('save_glossary', False)
    
    term_qps = user_settings.get('term_qps', 0)
    if term_qps and term_qps > 0:
        settings.translation.term_qps = term_qps
    
    term_workers = user_settings.get('term_workers', 0)
    if term_workers and term_workers > 0:
        settings.translation.term_pool_max_workers = term_workers
    
    
    # Configure PDF settings
    if pages:
        settings.pdf.pages = pages
    settings.pdf.no_dual = user_settings.get('no_dual', False)
    settings.pdf.no_mono = user_settings.get('no_mono', False)
    settings.pdf.dual_translate_first = user_settings.get('dual_translate_first', False)
    settings.pdf.skip_clean = user_settings.get('skip_clean', False)
    settings.pdf.enhance_compatibility = user_settings.get('enhance_compatibility', False)
    settings.pdf.ocr_workaround = user_settings.get('ocr_workaround', False)
    settings.pdf.translate_table_text = user_settings.get('translate_tables', user_settings.get('translate_table_text', True))
    
    # Additional PDF settings
    settings.pdf.split_short_lines = user_settings.get('split_short_lines', False)
    settings.pdf.short_line_split_factor = user_settings.get('split_factor', 0.8)
    settings.pdf.disable_rich_text_translate = user_settings.get('disable_rich_text', False)
    settings.pdf.use_alternating_pages_dual = user_settings.get('use_alternating_pages', False)
    settings.pdf.skip_scanned_detection = user_settings.get('skip_scanned_detection', False)
    settings.pdf.only_include_translated_page = user_settings.get('only_translated_pages', False)
    settings.pdf.auto_enable_ocr_workaround = user_settings.get('auto_ocr', False)
    
    # Max pages per part (0 means None/no limit)
    max_pages = user_settings.get('max_pages_per_part', 0)
    if max_pages and max_pages > 0:
        settings.pdf.max_pages_per_part = max_pages
    
    # Formula patterns (note: frontend uses 'formula', backend uses 'formular')
    formula_font = user_settings.get('formula_font_pattern', '')
    if formula_font:
        settings.pdf.formular_font_pattern = formula_font
    formula_char = user_settings.get('formula_char_pattern', '')
    if formula_char:
        settings.pdf.formular_char_pattern = formula_char
    
    # BabelDOC settings (note: frontend uses positive, backend uses negative/no_ prefix)
    # merge_line_numbers=True means we WANT to merge, so no_merge should be False
    settings.pdf.no_merge_alternating_line_numbers = not user_settings.get('merge_line_numbers', False)
    # remove_formula_lines=True means we WANT to remove, so no_remove should be False
    settings.pdf.no_remove_non_formula_lines = not user_settings.get('remove_formula_lines', False)
    settings.pdf.non_formula_line_iou_threshold = user_settings.get('iou_threshold', 0.9)
    settings.pdf.figure_table_protection_threshold = user_settings.get('protection_threshold', 0.9)
    settings.pdf.skip_formula_offset_calculation = user_settings.get('skip_formula_offset', False)
    
    # Map watermark mode - frontend uses 'watermarked', 'no_watermark', 'both' which matches backend
    watermark_mode = user_settings.get('watermark_mode', 'watermarked')
    # Pass through directly as values match backend expected values
    settings.pdf.watermark_output_mode = watermark_mode
    
    return settings


# Authentication endpoints
@app.get("/api/auth/status")
async def check_auth_status():
    """Check if initial setup is required"""
    return {
        "setup_required": not user_manager.has_users(),
        "version": __version__
    }


@app.post("/api/auth/setup")
async def initial_setup(request: SetupRequest):
    """Create the first admin user"""
    if user_manager.has_users():
        raise HTTPException(status_code=400, detail="Setup already completed")
    
    try:
        user_manager.create_user(request.username, request.password, is_admin=True)
        token = user_manager.authenticate(request.username, request.password)
        
        return {
            "success": True,
            "token": token,
            "username": request.username,
            "is_admin": True
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/auth/login")
async def login(request: LoginRequest):
    """Authenticate user and return session token"""
    token = user_manager.authenticate(request.username, request.password)
    
    if not token:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # Get user info
    user_data = user_manager.validate_token(token)
    
    return {
        "success": True,
        "token": token,
        "username": user_data['username'],
        "is_admin": user_data['is_admin']
    }


@app.post("/api/auth/logout")
async def logout(current_user: dict = Depends(get_current_user), authorization: str = Header(None)):
    """Logout current user"""
    token = authorization.replace("Bearer ", "")
    user_manager.logout(token)
    
    return {"success": True, "message": "Logged out successfully"}


@app.post("/api/auth/register")
async def register_user(request: RegisterRequest, admin_user: dict = Depends(get_admin_user)):
    """Register a new user (admin only)"""
    try:
        user_manager.create_user(request.username, request.password, is_admin=False)
        return {"success": True, "message": f"User '{request.username}' created successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/auth/users")
async def list_users(admin_user: dict = Depends(get_admin_user)):
    """List all users (admin only)"""
    try:
        users = user_manager.list_users(admin_user['username'])
        return {"success": True, "users": users}
    except AuthenticationError as e:
        raise HTTPException(status_code=403, detail=str(e))


@app.delete("/api/auth/users/{username}")
async def delete_user(username: str, admin_user: dict = Depends(get_admin_user)):
    """Delete a user (admin only)"""
    try:
        user_manager.delete_user(username, admin_user['username'])
        return {"success": True, "message": f"User '{username}' deleted successfully"}
    except (AuthenticationError, ValueError) as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/auth/registration-status")
async def get_registration_status():
    """Check if user registration is enabled (public endpoint)"""
    enabled = user_manager.get_registration_enabled()
    return {"success": True, "enabled": enabled}


@app.post("/api/auth/registration-toggle")
async def toggle_registration(request: dict, admin_user: dict = Depends(get_admin_user)):
    """Enable or disable user registration (admin only)"""
    try:
        enabled = request.get('enabled', False)
        user_manager.set_registration_enabled(enabled, admin_user['username'])
        return {"success": True, "enabled": enabled, "message": f"Registration {'enabled' if enabled else 'disabled'}"}
    except AuthenticationError as e:
        raise HTTPException(status_code=403, detail=str(e))


@app.post("/api/auth/register/public")
async def register_public(request: RegisterRequest):
    """Public user registration endpoint (only works if registration is enabled)"""
    # Check if registration is enabled
    if not user_manager.get_registration_enabled():
        raise HTTPException(
            status_code=403, 
            detail="User registration is currently disabled. Please contact an administrator."
        )
    
    try:
        user_manager.create_user(request.username, request.password, is_admin=False)
        
        # Automatically log in the new user
        token = user_manager.authenticate(request.username, request.password)
        user_data = user_manager.validate_token(token)
        
        return {
            "success": True,
            "message": f"Account created successfully! Welcome, {request.username}!",
            "token": token,
            "username": user_data['username'],
            "is_admin": user_data['is_admin']
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# Settings endpoints
@app.get("/api/settings")
async def get_settings(current_user: dict = Depends(get_current_user)):
    """Get current user's settings"""
    user_dir = user_manager.get_user_dir(current_user['username'])
    settings_file = user_dir / "settings.json"
    
    if settings_file.exists():
        settings = json.loads(settings_file.read_text())
    else:
        settings = {}
    
    return {"success": True, "settings": settings}


@app.post("/api/settings")
async def update_settings(settings: dict, current_user: dict = Depends(get_current_user)):
    """Update current user's settings"""
    user_dir = user_manager.get_user_dir(current_user['username'])
    user_dir.mkdir(parents=True, exist_ok=True)
    settings_file = user_dir / "settings.json"
    
    settings_file.write_text(json.dumps(settings, indent=2))
    
    return {"success": True, "message": "Settings updated successfully"}


@app.post("/api/settings/password")
async def change_password(request: ChangePasswordRequest, current_user: dict = Depends(get_current_user)):
    """Change current user's password"""
    try:
        user_manager.change_password(
            current_user['username'],
            request.old_password,
            request.new_password
        )
        return {"success": True, "message": "Password changed successfully"}
    except (AuthenticationError, ValueError) as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/settings/reset")
async def reset_settings(current_user: dict = Depends(get_current_user)):
    """Reset current user's settings to default"""
    user_dir = user_manager.get_user_dir(current_user['username'])
    settings_file = user_dir / "settings.json"
    
    settings_file.write_text("{}")
    
    return {"success": True, "message": "Settings reset to default"}


@app.get("/api/settings/export")
async def export_settings(current_user: dict = Depends(get_current_user)):
    """Export current user's settings as JSON file"""
    user_dir = user_manager.get_user_dir(current_user['username'])
    settings_file = user_dir / "settings.json"
    
    # Load current settings
    if settings_file.exists():
        settings = json.loads(settings_file.read_text())
    else:
        settings = {}
    
    # Create export data with metadata
    export_data = {
        "version": "1.0",
        "exported_at": datetime.utcnow().isoformat(),
        "exported_by": current_user['username'],
        "settings": settings
    }
    
    # Create temporary file for export
    import tempfile
    with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False, encoding='utf-8') as f:
        json.dump(export_data, f, indent=2, ensure_ascii=False)
        temp_path = f.name
    
    # Generate filename with timestamp
    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    filename = f"translation_config_{timestamp}.json"
    
    return FileResponse(
        temp_path,
        media_type="application/json",
        filename=filename,
        background=lambda: Path(temp_path).unlink()  # Cleanup temp file
    )


@app.post("/api/settings/import")
async def import_settings(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """Import settings from JSON file"""
    # Validate file type
    if not file.filename.endswith('.json'):
        raise HTTPException(status_code=400, detail="Only JSON files are allowed")
    
    try:
        # Read and parse JSON
        content = await file.read()
        import_data = json.loads(content.decode('utf-8'))
        
        # Validate structure
        if "settings" not in import_data:
            raise HTTPException(status_code=400, detail="Invalid configuration file: missing 'settings' field")
        
        # Optional: Check version compatibility
        if "version" in import_data:
            version = import_data["version"]
            if version != "1.0":
                logger.warning(f"Importing config with different version: {version}")
        
        # Get imported settings
        imported_settings = import_data["settings"]
        
        # Save to user's settings file
        user_dir = user_manager.get_user_dir(current_user['username'])
        user_dir.mkdir(parents=True, exist_ok=True)
        settings_file = user_dir / "settings.json"
        
        # Write settings
        settings_file.write_text(json.dumps(imported_settings, indent=2, ensure_ascii=False))
        
        # Count imported settings
        setting_count = len(imported_settings)
        
        return {
            "success": True,
            "message": f"Successfully imported {setting_count} settings",
            "imported_count": setting_count,
            "imported_from": import_data.get("exported_by", "unknown"),
            "exported_at": import_data.get("exported_at", "unknown")
        }
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON file")
    except Exception as e:
        logger.error(f"Failed to import settings: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to import settings: {str(e)}")


# File upload and translation endpoints
@app.post("/api/upload")
async def upload_file(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """Upload a PDF file for translation"""
    # Validate file type
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    # Save file to user's upload directory
    user_dir = user_manager.get_user_dir(current_user['username'])
    upload_dir = user_dir / "uploads"
    upload_dir.mkdir(parents=True, exist_ok=True)
    
    # Generate unique filename
    file_id = str(uuid.uuid4())
    file_path = upload_dir / f"{file_id}_{file.filename}"
    
    # Save uploaded file
    with file_path.open("wb") as f:
        content = await file.read()
        f.write(content)
    
    return {
        "success": True,
        "file_id": file_id,
        "filename": file.filename,
        "file_path": str(file_path)
    }


@app.post("/api/translate")
async def start_translation(
    file_id: str = Form(...),
    settings: str = Form(...),
    current_user: dict = Depends(get_current_user)
):
    """Start a translation task"""
    # Parse settings
    try:
        translation_settings = json.loads(settings)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid settings JSON")
    
    # Find the uploaded file
    user_dir = user_manager.get_user_dir(current_user['username'])
    upload_dir = user_dir / "uploads"
    
    # Find file with matching file_id
    matching_files = list(upload_dir.glob(f"{file_id}_*"))
    if not matching_files:
        raise HTTPException(status_code=404, detail="File not found")
    
    file_path = matching_files[0]
    
    # Generate task ID
    task_id = str(uuid.uuid4())
    
    # Create output directory
    output_dir = user_dir / "outputs" / task_id
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Initialize task status
    active_tasks[task_id] = {
        "status": "queued",
        "progress": 0,
        "message": "Translation queued",
        "username": current_user['username'],
        "file_id": file_id,
        "created_at": datetime.utcnow().isoformat()
    }
    
    # Start translation in background
    asyncio.create_task(run_translation(task_id, file_path, output_dir, translation_settings, current_user['username']))
    
    return {
        "success": True,
        "task_id": task_id,
        "message": "Translation started"
    }


async def run_translation(task_id: str, file_path: Path, output_dir: Path, translation_settings: dict, username: str):
    """Run translation task in background using real translation engine"""
    mono_path = None
    dual_path = None
    original_filename = file_path.stem  # Get filename without extension
    
    try:
        active_tasks[task_id]["status"] = "processing"
        active_tasks[task_id]["message"] = "Loading user settings..."
        active_tasks[task_id]["original_filename"] = original_filename  # Store for download filename
        
        # Load user settings
        user_dir = user_manager.get_user_dir(username)
        settings_file = user_dir / "settings.json"
        user_settings = json.loads(settings_file.read_text()) if settings_file.exists() else {}
        
        # Get pages from translation_settings if provided
        pages = translation_settings.get('pages') if translation_settings else None
        
        logger.info(f"Starting translation task {task_id} for user {username}")
        logger.info(f"User settings: {user_settings}")
        
        # Build SettingsModel from user config
        settings = build_settings_model_from_user_config(user_settings, output_dir, pages)
        
        # Validate settings
        try:
            settings.validate_settings()
        except ValueError as e:
            raise ValueError(f"Invalid translation settings: {e}")
        
        active_tasks[task_id]["message"] = "Starting translation..."
        
        # Run translation using do_translate_async_stream
        async for event in do_translate_async_stream(settings, file_path):
            if event["type"] in ("progress_start", "progress_update", "progress_end"):
                # Update progress
                stage = event.get("stage", "Processing")
                progress = event.get("overall_progress", 0)
                part_index = event.get("part_index", 1)
                total_parts = event.get("total_parts", 1)
                stage_current = event.get("stage_current", 0)
                stage_total = event.get("stage_total", 1)
                
                message = f"{stage} ({part_index}/{total_parts}, {stage_current}/{stage_total})"
                
                active_tasks[task_id]["progress"] = int(progress)
                active_tasks[task_id]["message"] = message
                
                logger.debug(f"Task {task_id}: {progress}% - {message}")
                
            elif event["type"] == "finish":
                # Translation completed
                result = event["translate_result"]
                
                # Get actual output paths from the result
                result_mono_path = result.mono_pdf_path
                result_dual_path = result.dual_pdf_path
                
                # Rename output files to use original filename
                if result_mono_path and result_mono_path.exists():
                    mono_path = output_dir / f"{original_filename}_mono.pdf"
                    result_mono_path.rename(mono_path)
                    logger.info(f"Mono PDF saved: {mono_path}")
                
                if result_dual_path and result_dual_path.exists():
                    dual_path = output_dir / f"{original_filename}_dual.pdf"
                    result_dual_path.rename(dual_path)
                    logger.info(f"Dual PDF saved: {dual_path}")
                
                # Get token usage if available
                token_usage = event.get("token_usage", {})
                
                break
                
            elif event["type"] == "error":
                error_msg = event.get("error", "Unknown error")
                raise RuntimeError(f"Translation error: {error_msg}")
        
        # Mark as complete
        active_tasks[task_id]["status"] = "completed"
        active_tasks[task_id]["progress"] = 100
        active_tasks[task_id]["message"] = "Translation completed"
        active_tasks[task_id]["output_files"] = {
            "mono": str(mono_path) if mono_path else None,
            "dual": str(dual_path) if dual_path else None
        }
        active_tasks[task_id]["original_filename"] = original_filename
        
        # Update user history
        history_file = user_dir / "history.json"
        history = json.loads(history_file.read_text()) if history_file.exists() else []
        history.append({
            "task_id": task_id,
            "file_id": active_tasks[task_id].get("file_id"),
            "filename": file_path.name,
            "original_filename": original_filename,
            "created_at": active_tasks[task_id]["created_at"],
            "completed_at": datetime.utcnow().isoformat(),
            "status": "completed",
            "mono_path": str(mono_path) if mono_path else None,
            "dual_path": str(dual_path) if dual_path else None
        })
        history_file.write_text(json.dumps(history, indent=2))
        
        logger.info(f"Translation task {task_id} completed successfully")
        
    except Exception as e:
        logger.error(f"Translation task {task_id} failed: {e}", exc_info=True)
        active_tasks[task_id]["status"] = "failed"
        active_tasks[task_id]["message"] = f"Translation failed: {str(e)}"
        
        # Update history with failed status
        try:
            user_dir = user_manager.get_user_dir(username)
            history_file = user_dir / "history.json"
            history = json.loads(history_file.read_text()) if history_file.exists() else []
            history.append({
                "task_id": task_id,
                "filename": file_path.name,
                "created_at": active_tasks[task_id]["created_at"],
                "completed_at": datetime.utcnow().isoformat(),
                "status": "failed",
                "error": str(e)
            })
            history_file.write_text(json.dumps(history, indent=2))
        except Exception as hist_error:
            logger.error(f"Failed to update history: {hist_error}")


@app.get("/api/translate/status/{task_id}")
async def get_translation_status(task_id: str, current_user: dict = Depends(get_current_user)):
    """Get status of a translation task"""
    if task_id not in active_tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task = active_tasks[task_id]
    
    # Verify task belongs to current user
    if task["username"] != current_user['username']:
        raise HTTPException(status_code=403, detail="Access denied")
    
    return {"success": True, "task": task}


@app.get("/api/translate/history")
async def get_translation_history(current_user: dict = Depends(get_current_user)):
    """Get current user's translation history"""
    user_dir = user_manager.get_user_dir(current_user['username'])
    history_file = user_dir / "history.json"
    
    if history_file.exists():
        history = json.loads(history_file.read_text())
    else:
        history = []
    
    return {"success": True, "history": history}


@app.delete("/api/translate/history/{task_id}")
async def delete_history_item(task_id: str, current_user: dict = Depends(get_current_user)):
    """Delete a history item and its associated files"""
    import shutil
    
    user_dir = user_manager.get_user_dir(current_user['username'])
    history_file = user_dir / "history.json"
    
    if not history_file.exists():
        raise HTTPException(status_code=404, detail="History not found")
    
    history = json.loads(history_file.read_text())
    
    # Find the history item
    item_to_delete = None
    for item in history:
        if item.get('task_id') == task_id:
            item_to_delete = item
            break
    
    if not item_to_delete:
        raise HTTPException(status_code=404, detail="History item not found")
    
    # Delete output directory (translated files)
    output_dir = user_dir / "outputs" / task_id
    if output_dir.exists():
        shutil.rmtree(output_dir)
        logger.info(f"Deleted output directory: {output_dir}")
    
    # Delete original uploaded file if we can find it
    file_id = item_to_delete.get('file_id')
    if file_id:
        upload_dir = user_dir / "uploads"
        matching_files = list(upload_dir.glob(f"{file_id}_*"))
        for f in matching_files:
            f.unlink()
            logger.info(f"Deleted uploaded file: {f}")
    
    # Remove from history
    history = [item for item in history if item.get('task_id') != task_id]
    history_file.write_text(json.dumps(history, indent=2))
    
    # Remove from active_tasks if exists
    if task_id in active_tasks:
        del active_tasks[task_id]
    
    return {"success": True, "message": "History item deleted"}


@app.get("/api/translate/download/{task_id}")
async def download_translation(
    task_id: str,
    file_type: str = "mono",
    current_user: dict = Depends(get_current_user)
):
    """Download a translated file"""
    if task_id not in active_tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task = active_tasks[task_id]
    
    # Verify task belongs to current user
    if task["username"] != current_user['username']:
        raise HTTPException(status_code=403, detail="Access denied")
    
    if task["status"] != "completed":
        raise HTTPException(status_code=400, detail="Translation not completed")
    
    # Get file path
    output_files = task.get("output_files", {})
    file_path = output_files.get(file_type)
    
    if not file_path or not Path(file_path).exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    # Generate clean filename: originalname_mono/dual.pdf
    original_filename = task.get("original_filename", "translated")
    # Remove .pdf extension if present
    if original_filename.lower().endswith('.pdf'):
        original_filename = original_filename[:-4]
    # Remove UUID prefix if present (format: uuid_filename)
    if '_' in original_filename:
        parts = original_filename.split('_', 1)
        # Check if first part looks like UUID (32+ hex chars with dashes)
        if len(parts[0]) >= 32 or (len(parts[0]) == 36 and '-' in parts[0]):
            original_filename = parts[1] if len(parts) > 1 else original_filename
    # Clean filename for safety
    import re
    clean_name = re.sub(r'[^\w\-\u4e00-\u9fff\.]', '_', original_filename)
    # Generate download filename: originalname_mono/dual.pdf
    download_filename = f"{clean_name}_{file_type}.pdf"
    
    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename=download_filename
    )


# Serve static files (frontend)
static_dir = Path(__file__).parent / "static"
if static_dir.exists():
    # Mount CSS and JS directories
    css_dir = static_dir / "css"
    js_dir = static_dir / "js"
    
    if css_dir.exists():
        app.mount("/static/css", StaticFiles(directory=str(css_dir)), name="css")
    if js_dir.exists():
        app.mount("/static/js", StaticFiles(directory=str(js_dir)), name="js")
    
    # Serve HTML files from static root
    app.mount("/static", StaticFiles(directory=str(static_dir)), name="static_html")
    
    # Serve root HTML files
    app.mount("/", StaticFiles(directory=str(static_dir), html=True), name="root")


# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize on startup"""
    logger.info("PDFMathTranslate Web API starting...")
    user_manager.cleanup_expired_sessions()
    logger.info("Web API ready")


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("PDFMathTranslate Web API shutting down...")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
