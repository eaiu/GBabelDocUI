/**
 * Internationalization (i18n) support
 * Supports English and Chinese
 */

const translations = {
    en: {
        // Navigation
        'nav.upload': 'Upload',
        'nav.settings': 'Settings',
        'nav.logout': 'Logout',

        // Login Page
        'login.title': 'PDFMathTranslate',
        'login.welcome': 'Welcome back! Please login to continue.',
        'login.setup.title': 'First time setup - Create your admin account',
        'login.setup.info': 'Initial Setup',
        'login.setup.desc': 'Create your admin account to get started.',
        'login.username': 'Username',
        'login.password': 'Password',
        'login.password.confirm': 'Confirm Password',
        'login.password.min': 'At least 6 characters',
        'login.username.min': 'At least 3 characters',
        'login.btn.setup': 'Create Admin Account',
        'login.btn.login': 'Login',
        'login.footer': 'PDFMathTranslate v2.0 - Secure Multi-User System',

        // Upload Page
        'upload.title': 'Upload PDF',
        'upload.subtitle': 'Upload a file or enter a URL to translate',
        'upload.drag': 'Drag and drop your PDF here',
        'upload.browse': 'or click to browse',
        'upload.or': '— OR —',
        'upload.url': 'PDF URL',
        'upload.url.placeholder': 'https://example.com/document.pdf',
        'upload.pages': 'Pages to Translate',
        'upload.pages.all': 'All Pages',
        'upload.pages.first': 'First Page Only',
        'upload.pages.first5': 'First 5 Pages',
        'upload.pages.custom': 'Custom Range',
        'upload.pages.custom.label': 'Custom Pages',
        'upload.pages.custom.placeholder': 'e.g., 1-5,10,15-20',
        'upload.pages.custom.help': 'Enter page numbers or ranges separated by commas',
        'upload.btn.translate': 'Translate',
        'upload.progress.title': 'Translation Progress',
        'upload.progress.init': 'Initializing...',
        'upload.result.title': 'Translation Complete!',
        'upload.result.mono': 'Download Translation Only',
        'upload.result.dual': 'Download Bilingual',
        'upload.result.new': 'Start New Translation',
        'upload.history.title': 'Translation History',
        'upload.history.subtitle': 'Your recent translations',
        'upload.history.empty': 'No translations yet',
        'upload.history.delete.confirm': 'Are you sure you want to delete this translation? This will also delete the original and translated files.',
        'upload.history.delete.success': 'Translation deleted successfully',
        'upload.history.delete.failed': 'Failed to delete: ',

        // Settings Page
        'settings.title': 'Settings',
        'settings.subtitle': 'Configure your translation preferences and account',

        // Settings Tabs
        'settings.tab.account': 'Account',
        'settings.tab.basic': 'Basic Settings',
        'settings.tab.pdf': 'PDF Output',
        'settings.tab.advanced': 'Advanced',
        'settings.tab.rate': 'Rate Limiting',
        'settings.tab.babeldoc': 'BabelDOC',
        'settings.tab.users': 'User Management',

        // Account Settings
        'settings.account.title': 'Account Settings',
        'settings.account.username': 'Username',
        'settings.account.password.title': 'Change Password',
        'settings.account.password.current': 'Current Password',
        'settings.account.password.new': 'New Password',
        'settings.account.password.confirm': 'Confirm New Password',
        'settings.account.password.placeholder.current': 'Enter current password',
        'settings.account.password.placeholder.new': 'Enter new password (min 6 characters)',
        'settings.account.password.placeholder.confirm': 'Confirm new password',
        'settings.account.password.btn': 'Change Password',

        // Basic Settings
        'settings.basic.service': 'Translation Service',
        'settings.basic.service.label': 'Service',
        'settings.basic.apikey': 'API Key',
        'settings.basic.apikey.placeholder': 'Enter your API key',
        'settings.basic.model': 'Model',
        'settings.basic.model.placeholder': 'e.g., gpt-4',
        'settings.basic.endpoint': 'Endpoint URL',
        'settings.basic.endpoint.placeholder': 'e.g., https://api.example.com',
        'settings.basic.lang.title': 'Language Settings',
        'settings.basic.lang.from': 'Source Language',
        'settings.basic.lang.to': 'Target Language',
        'settings.basic.lang.auto': 'Auto Detect',
        'settings.basic.pages.title': 'Page Selection',
        'settings.basic.pages.range': 'Page Range',
        'settings.basic.pages.all': 'All Pages',
        'settings.basic.pages.first': 'First Page',
        'settings.basic.pages.first5': 'First 5 Pages',
        'settings.basic.pages.custom': 'Custom Range',
        'settings.basic.pages.custom.label': 'Custom Pages',
        'settings.basic.pages.custom.placeholder': 'e.g., 1-5,10,15-20',
        'settings.basic.pages.custom.help': 'Enter page numbers or ranges separated by commas',
        'settings.basic.cache': 'Ignore Cache',
        'settings.basic.cache.help': 'Force re-translation even if cached results exist',
        'settings.basic.btn.save': 'Save Basic Settings',

        // OpenAI Settings
        'settings.openai.title': 'OpenAI Configuration',
        'settings.openai.model': 'Model',
        'settings.openai.model.placeholder': 'gpt-4o-mini',
        'settings.openai.model.help': 'OpenAI model to use (e.g., gpt-4, gpt-4o-mini)',
        'settings.openai.apikey': 'API Key',
        'settings.openai.apikey.placeholder': 'sk-...',
        'settings.openai.apikey.help': 'Your OpenAI API key (required)',
        'settings.openai.baseurl': 'Base URL (Optional)',
        'settings.openai.baseurl.placeholder': 'https://api.openai.com/v1',
        'settings.openai.baseurl.help': 'Custom endpoint for OpenAI-compatible services',
        'settings.openai.timeout': 'Timeout (seconds)',
        'settings.openai.timeout.placeholder': '60',
        'settings.openai.temperature': 'Temperature',
        'settings.openai.temperature.placeholder': '0.7',
        'settings.openai.send_temperature': 'Send Temperature Parameter',
        'settings.openai.reasoning_effort': 'Reasoning Effort',
        'settings.openai.reasoning_effort.none': 'None',
        'settings.openai.reasoning_effort.minimal': 'Minimal',
        'settings.openai.reasoning_effort.low': 'Low',
        'settings.openai.reasoning_effort.medium': 'Medium',
        'settings.openai.reasoning_effort.high': 'High',
        'settings.openai.send_reasoning_effort': 'Send Reasoning Effort Parameter',
        'settings.openai.json_mode': 'Enable JSON Mode',

        // Azure OpenAI Settings
        'settings.azure.title': 'Azure OpenAI Configuration',
        'settings.azure.model': 'Model / Deployment Name',
        'settings.azure.model.placeholder': 'gpt-4o-mini',
        'settings.azure.model.help': 'Azure OpenAI deployment name',
        'settings.azure.apikey': 'API Key',
        'settings.azure.apikey.placeholder': 'Your Azure API key',
        'settings.azure.apikey.help': 'Your Azure OpenAI API key (required)',
        'settings.azure.baseurl': 'Base URL / Endpoint',
        'settings.azure.baseurl.placeholder': 'https://your-resource.openai.azure.com',
        'settings.azure.baseurl.help': 'Your Azure OpenAI endpoint (required)',
        'settings.azure.api_version': 'API Version',
        'settings.azure.api_version.placeholder': '2024-06-01',
        'settings.azure.api_version.help': 'Azure OpenAI API version',

        // Google Gemini Settings
        'settings.gemini.title': 'Google Gemini Configuration',
        'settings.gemini.model': 'Model',
        'settings.gemini.model.placeholder': 'gemini-1.5-flash',
        'settings.gemini.model.help': 'Gemini model to use',
        'settings.gemini.apikey': 'API Key',
        'settings.gemini.apikey.placeholder': 'Your Gemini API key',
        'settings.gemini.apikey.help': 'Your Google Gemini API key (required)',
        'settings.gemini.json_mode': 'Enable JSON Mode',

        // PDF Output Settings
        'settings.pdf.title': 'PDF Output Options',
        'settings.pdf.no_mono': 'Skip Mono PDF Output',
        'settings.pdf.no_mono.help': "Don't generate translation-only PDF",
        'settings.pdf.no_dual': 'Skip Dual PDF Output',
        'settings.pdf.no_dual.help': "Don't generate bilingual PDF",
        'settings.pdf.dual_first': 'Translation First in Dual PDF',
        'settings.pdf.dual_first.help': 'Show translation before original in dual PDF',
        'settings.pdf.alternating': 'Use Alternating Pages',
        'settings.pdf.alternating.help': 'Alternate between original and translated pages',
        'settings.pdf.watermark': 'Watermark Mode',
        'settings.pdf.watermark.yes': 'Watermarked',
        'settings.pdf.watermark.no': 'No Watermark',
        'settings.pdf.watermark.both': 'Both',
        'settings.pdf.only_translated': 'Only Include Translated Pages',
        'settings.pdf.only_translated.help': "Exclude pages that weren't translated",
        'settings.pdf.btn.save': 'Save PDF Output Settings',

        // Advanced Settings
        'settings.advanced.title': 'Advanced Translation Options',
        'settings.advanced.system_prompt': 'Custom System Prompt',
        'settings.advanced.system_prompt.placeholder': 'e.g., You are a professional translator...',
        'settings.advanced.system_prompt.help': 'Custom instructions for the translation model',
        'settings.advanced.min_length': 'Minimum Text Length',
        'settings.advanced.min_length.help': 'Minimum characters required to translate a text block',
        'settings.advanced.font': 'Primary Font Family',
        'settings.advanced.font.auto': 'Auto',
        'settings.advanced.font.serif': 'Serif',
        'settings.advanced.font.sans': 'Sans-serif',
        'settings.advanced.font.script': 'Script',
        'settings.advanced.term_extraction': 'Enable Auto Term Extraction',
        'settings.advanced.term_extraction.help': 'Automatically extract and use domain-specific terms',
        'settings.advanced.save_glossary': 'Save Auto-Extracted Glossary',
        'settings.advanced.rpc_doclayout': 'RPC DocLayout Service (Optional)',
        'settings.advanced.rpc_doclayout.placeholder': 'http://host:port',
        'settings.advanced.rpc_doclayout.help': 'Remote document layout analysis service',
        'settings.advanced.pdf_title': 'Advanced PDF Options',
        'settings.advanced.skip_clean': 'Skip Clean (Improve Compatibility)',
        'settings.advanced.disable_rich_text': 'Disable Rich Text Translation',
        'settings.advanced.enhance_compat': 'Enhance Compatibility',
        'settings.advanced.enhance_compat.help': 'Auto-enables skip clean and disable rich text',
        'settings.advanced.split_lines': 'Force Split Short Lines',
        'settings.advanced.split_factor': 'Short Line Split Factor',
        'settings.advanced.split_factor.label': 'Threshold',
        'settings.advanced.translate_tables': 'Translate Table Text (Experimental)',
        'settings.advanced.skip_scanned': 'Skip Scanned Detection',
        'settings.advanced.ocr_workaround': 'OCR Workaround (Experimental)',
        'settings.advanced.auto_ocr': 'Auto Enable OCR Workaround',
        'settings.advanced.max_pages': 'Max Pages Per Part (0 = no limit)',
        'settings.advanced.formula_font': 'Formula Font Pattern (Regex)',
        'settings.advanced.formula_font.placeholder': 'e.g., CMMI|CMR',
        'settings.advanced.formula_char': 'Formula Char Pattern (Regex)',
        'settings.advanced.formula_char.placeholder': 'e.g., [∫∬∭∮∯∰∇∆]',
        'settings.advanced.btn.save': 'Save Advanced Settings',

        // Rate Limiting Settings
        'settings.rate.title': 'Translation Rate Limiting',
        'settings.rate.mode': 'Rate Limit Mode',
        'settings.rate.mode.rpm': 'RPM (Requests Per Minute)',
        'settings.rate.mode.concurrent': 'Concurrent Threads',
        'settings.rate.mode.custom': 'Custom (QPS + Workers)',
        'settings.rate.rpm': 'Requests Per Minute',
        'settings.rate.concurrent': 'Concurrent Threads',
        'settings.rate.qps': 'QPS (Queries Per Second)',
        'settings.rate.workers': 'Pool Max Workers',
        'settings.rate.term.title': 'Term Extraction Rate Limiting',
        'settings.rate.term.service': 'Term Service',
        'settings.rate.term.service.same': 'Same as Translation Service',
        'settings.rate.term.mode': 'Term Rate Limit Mode',
        'settings.rate.term.rpm': 'Term RPM',
        'settings.rate.term.concurrent': 'Term Concurrent Threads',
        'settings.rate.term.qps': 'Term QPS',
        'settings.rate.term.workers': 'Term Pool Workers',
        'settings.rate.btn.save': 'Save Rate Limit Settings',

        // BabelDOC Settings
        'settings.babeldoc.title': 'BabelDOC Advanced Options',
        'settings.babeldoc.merge_lines': 'Merge Alternating Line Numbers',
        'settings.babeldoc.merge_lines.help': 'Handle documents with alternating line numbers',
        'settings.babeldoc.remove_formula': 'Remove Non-Formula Lines',
        'settings.babeldoc.remove_formula.help': 'Remove non-formula lines within paragraph areas',
        'settings.babeldoc.iou_threshold': 'Non-Formula Line IoU Threshold',
        'settings.babeldoc.iou_threshold.label': 'Threshold',
        'settings.babeldoc.protection_threshold': 'Figure/Table Protection Threshold',
        'settings.babeldoc.skip_formula_offset': 'Skip Formula Offset Calculation',
        'settings.babeldoc.btn.save': 'Save BabelDOC Settings',

        // User Management Settings
        'settings.users.title': 'User Management',
        'settings.users.add.title': 'Add New User',
        'settings.users.add.username': 'Username',
        'settings.users.add.username.placeholder': 'Enter username',
        'settings.users.add.password': 'Password',
        'settings.users.add.password.placeholder': 'Enter password',
        'settings.users.add.btn': 'Add User',
        'settings.users.list.title': 'Existing Users',
        'settings.users.registration.btn.save': 'Save Registration Settings',

        // Global Buttons
        'settings.global.reset': 'Reset to Defaults',
        'settings.global.save_all': 'Save All Settings',

        // Configuration Import/Export
        'settings.config.title': 'Configuration Management',
        'settings.config.export.btn': 'Export Configuration',
        'settings.config.export.desc': 'Download your translation settings as a JSON file',
        'settings.config.export.warning': '⚠️ Warning: The exported file contains API keys and sensitive credentials. Store it securely.',
        'settings.config.export.success': 'Configuration exported successfully',
        'settings.config.import.btn': 'Import Configuration',
        'settings.config.import.desc': 'Upload a configuration file to restore settings',
        'settings.config.import.success': 'Configuration imported successfully',
        'settings.config.import.error': 'Failed to import configuration',
        'settings.config.import.invalid': 'Invalid configuration file',

        // Registration Page
        'register.title': 'Create Account',
        'register.subtitle': 'Register a new account',
        'register.username': 'Username',
        'register.password': 'Password',
        'register.password.confirm': 'Confirm Password',
        'register.username.min': 'At least 3 characters',
        'register.password.min': 'At least 6 characters',
        'register.btn.register': 'Register',
        'register.link.login': 'Already have an account? Login',
        'register.link.from_login': "Don't have an account? Register",
        'register.disabled.title': 'Registration Disabled',
        'register.disabled.message': 'New user registration is currently disabled. Please contact an administrator.',
        'register.success': 'Account created successfully! Welcome!',
        'register.error.mismatch': 'Passwords do not match',

        // User Management - Registration Settings
        'settings.users.registration.title': 'Registration Settings',
        'settings.users.registration.allow': 'Allow New User Registration',
        'settings.users.registration.help': 'When enabled, users can register new accounts from the login page',
        'settings.users.registration.enabled': 'Registration is currently enabled',
        'settings.users.registration.disabled': 'Registration is currently disabled',

        // Common
        'common.loading': 'Loading...',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.delete': 'Delete',
        'common.reset': 'Reset to Defaults',
        'common.saveall': 'Save All Settings',
    },

    zh: {
        // Navigation
        'nav.upload': '上传',
        'nav.settings': '设置',
        'nav.logout': '退出登录',

        // Login Page
        'login.title': 'PDFMathTranslate',
        'login.welcome': '欢迎回来！请登录以继续。',
        'login.setup.title': '首次设置 - 创建管理员账户',
        'login.setup.info': '初始设置',
        'login.setup.desc': '创建您的管理员账户以开始使用。',
        'login.username': '用户名',
        'login.password': '密码',
        'login.password.confirm': '确认密码',
        'login.password.min': '至少6个字符',
        'login.username.min': '至少3个字符',
        'login.btn.setup': '创建管理员账户',
        'login.btn.login': '登录',
        'login.footer': 'PDFMathTranslate v2.0 - 安全多用户系统',

        // Upload Page
        'upload.title': '上传PDF',
        'upload.subtitle': '上传文件或输入URL进行翻译',
        'upload.drag': '拖放您的PDF文件到这里',
        'upload.browse': '或点击浏览',
        'upload.or': '— 或者 —',
        'upload.url': 'PDF URL',
        'upload.url.placeholder': 'https://example.com/document.pdf',
        'upload.pages': '翻译页面',
        'upload.pages.all': '所有页面',
        'upload.pages.first': '仅第一页',
        'upload.pages.first5': '前5页',
        'upload.pages.custom': '自定义范围',
        'upload.pages.custom.label': '自定义页面',
        'upload.pages.custom.placeholder': '例如：1-5,10,15-20',
        'upload.pages.custom.help': '输入页码或范围，用逗号分隔',
        'upload.btn.translate': '开始翻译',
        'upload.progress.title': '翻译进度',
        'upload.progress.init': '初始化中...',
        'upload.result.title': '翻译完成！',
        'upload.result.mono': '下载译文',
        'upload.result.dual': '下载双语版',
        'upload.result.new': '开始新翻译',
        'upload.history.title': '翻译历史',
        'upload.history.subtitle': '您最近的翻译',
        'upload.history.empty': '暂无翻译记录',
        'upload.history.delete.confirm': '确定要删除这个翻译记录吗？这将同时删除原文件和翻译后的文件。',
        'upload.history.delete.success': '删除成功',
        'upload.history.delete.failed': '删除失败：',

        // Settings Page
        'settings.title': '设置',
        'settings.subtitle': '配置您的翻译偏好和账户',

        // Settings Tabs
        'settings.tab.account': '账户',
        'settings.tab.basic': '基础设置',
        'settings.tab.pdf': 'PDF输出',
        'settings.tab.advanced': '高级选项',
        'settings.tab.rate': '速率限制',
        'settings.tab.babeldoc': 'BabelDOC',
        'settings.tab.users': '用户管理',

        // Account Settings
        'settings.account.title': '账户设置',
        'settings.account.username': '用户名',
        'settings.account.password.title': '修改密码',
        'settings.account.password.current': '当前密码',
        'settings.account.password.new': '新密码',
        'settings.account.password.confirm': '确认新密码',
        'settings.account.password.placeholder.current': '输入当前密码',
        'settings.account.password.placeholder.new': '输入新密码（至少6个字符）',
        'settings.account.password.placeholder.confirm': '确认新密码',
        'settings.account.password.btn': '修改密码',

        // Basic Settings
        'settings.basic.service': '翻译服务',
        'settings.basic.service.label': '服务',
        'settings.basic.apikey': 'API密钥',
        'settings.basic.apikey.placeholder': '输入您的API密钥',
        'settings.basic.model': '模型',
        'settings.basic.model.placeholder': '例如：gpt-4',
        'settings.basic.endpoint': '端点URL',
        'settings.basic.endpoint.placeholder': '例如：https://api.example.com',
        'settings.basic.lang.title': '语言设置',
        'settings.basic.lang.from': '源语言',
        'settings.basic.lang.to': '目标语言',
        'settings.basic.lang.auto': '自动检测',
        'settings.basic.pages.title': '页面选择',
        'settings.basic.pages.range': '页面范围',
        'settings.basic.pages.all': '所有页面',
        'settings.basic.pages.first': '第一页',
        'settings.basic.pages.first5': '前5页',
        'settings.basic.pages.custom': '自定义范围',
        'settings.basic.pages.custom.label': '自定义页面',
        'settings.basic.pages.custom.placeholder': '例如：1-5,10,15-20',
        'settings.basic.pages.custom.help': '输入页码或范围，用逗号分隔',
        'settings.basic.cache': '忽略缓存',
        'settings.basic.cache.help': '即使存在缓存结果也强制重新翻译',
        'settings.basic.btn.save': '保存基础设置',

        // OpenAI Settings
        'settings.openai.title': 'OpenAI配置',
        'settings.openai.model': '模型',
        'settings.openai.model.placeholder': 'gpt-4o-mini',
        'settings.openai.model.help': '要使用的OpenAI模型（例如：gpt-4, gpt-4o-mini）',
        'settings.openai.apikey': 'API密钥',
        'settings.openai.apikey.placeholder': 'sk-...',
        'settings.openai.apikey.help': '您的OpenAI API密钥（必填）',
        'settings.openai.baseurl': '基础URL（可选）',
        'settings.openai.baseurl.placeholder': 'https://api.openai.com/v1',
        'settings.openai.baseurl.help': 'OpenAI兼容服务的自定义端点',
        'settings.openai.timeout': '超时（秒）',
        'settings.openai.timeout.placeholder': '60',
        'settings.openai.temperature': '温度',
        'settings.openai.temperature.placeholder': '0.7',
        'settings.openai.send_temperature': '发送温度参数',
        'settings.openai.reasoning_effort': '推理强度',
        'settings.openai.reasoning_effort.none': '无',
        'settings.openai.reasoning_effort.minimal': '最小',
        'settings.openai.reasoning_effort.low': '低',
        'settings.openai.reasoning_effort.medium': '中',
        'settings.openai.reasoning_effort.high': '高',
        'settings.openai.send_reasoning_effort': '发送推理强度参数',
        'settings.openai.json_mode': '启用JSON模式',

        // Azure OpenAI Settings
        'settings.azure.title': 'Azure OpenAI配置',
        'settings.azure.model': '模型/部署名称',
        'settings.azure.model.placeholder': 'gpt-4o-mini',
        'settings.azure.model.help': 'Azure OpenAI部署名称',
        'settings.azure.apikey': 'API密钥',
        'settings.azure.apikey.placeholder': '您的Azure API密钥',
        'settings.azure.apikey.help': '您的Azure OpenAI API密钥（必填）',
        'settings.azure.baseurl': '基础URL/端点',
        'settings.azure.baseurl.placeholder': 'https://your-resource.openai.azure.com',
        'settings.azure.baseurl.help': '您的Azure OpenAI端点（必填）',
        'settings.azure.api_version': 'API版本',
        'settings.azure.api_version.placeholder': '2024-06-01',
        'settings.azure.api_version.help': 'Azure OpenAI API版本',

        // Google Gemini Settings
        'settings.gemini.title': 'Google Gemini配置',
        'settings.gemini.model': '模型',
        'settings.gemini.model.placeholder': 'gemini-1.5-flash',
        'settings.gemini.model.help': '要使用的Gemini模型',
        'settings.gemini.apikey': 'API密钥',
        'settings.gemini.apikey.placeholder': '您的Gemini API密钥',
        'settings.gemini.apikey.help': '您的Google Gemini API密钥（必填）',
        'settings.gemini.json_mode': '启用JSON模式',

        // PDF Output Settings
        'settings.pdf.title': 'PDF输出选项',
        'settings.pdf.no_mono': '跳过单语PDF输出',
        'settings.pdf.no_mono.help': '不生成仅翻译的PDF',
        'settings.pdf.no_dual': '跳过双语PDF输出',
        'settings.pdf.no_dual.help': '不生成双语PDF',
        'settings.pdf.dual_first': '双语PDF中译文优先',
        'settings.pdf.dual_first.help': '在双语PDF中先显示译文，后显示原文',
        'settings.pdf.alternating': '使用交替页面',
        'settings.pdf.alternating.help': '原文页和译文页交替显示',
        'settings.pdf.watermark': '水印模式',
        'settings.pdf.watermark.yes': '带水印',
        'settings.pdf.watermark.no': '无水印',
        'settings.pdf.watermark.both': '两者都生成',
        'settings.pdf.only_translated': '仅包含已翻译页面',
        'settings.pdf.only_translated.help': '排除未翻译的页面',
        'settings.pdf.btn.save': '保存PDF输出设置',

        // Advanced Settings
        'settings.advanced.title': '高级翻译选项',
        'settings.advanced.system_prompt': '自定义系统提示词',
        'settings.advanced.system_prompt.placeholder': '例如：你是一位专业的翻译人员...',
        'settings.advanced.system_prompt.help': '翻译模型的自定义指令',
        'settings.advanced.min_length': '最小文本长度',
        'settings.advanced.min_length.help': '翻译文本块所需的最少字符数',
        'settings.advanced.font': '主要字体系列',
        'settings.advanced.font.auto': '自动',
        'settings.advanced.font.serif': '衬线体',
        'settings.advanced.font.sans': '无衬线体',
        'settings.advanced.font.script': '手写体',
        'settings.advanced.term_extraction': '启用自动术语提取',
        'settings.advanced.term_extraction.help': '自动提取并使用领域特定术语',
        'settings.advanced.save_glossary': '保存自动提取的术语表',
        'settings.advanced.rpc_doclayout': 'RPC文档布局服务（可选）',
        'settings.advanced.rpc_doclayout.placeholder': 'http://host:port',
        'settings.advanced.rpc_doclayout.help': '远程文档布局分析服务',
        'settings.advanced.pdf_title': '高级PDF选项',
        'settings.advanced.skip_clean': '跳过清理（提高兼容性）',
        'settings.advanced.disable_rich_text': '禁用富文本翻译',
        'settings.advanced.enhance_compat': '增强兼容性',
        'settings.advanced.enhance_compat.help': '自动启用跳过清理和禁用富文本',
        'settings.advanced.split_lines': '强制拆分短行',
        'settings.advanced.split_factor': '短行拆分因子',
        'settings.advanced.split_factor.label': '阈值',
        'settings.advanced.translate_tables': '翻译表格文本（实验性）',
        'settings.advanced.skip_scanned': '跳过扫描检测',
        'settings.advanced.ocr_workaround': 'OCR变通方案（实验性）',
        'settings.advanced.auto_ocr': '自动启用OCR变通方案',
        'settings.advanced.max_pages': '每部分最大页数（0=无限制）',
        'settings.advanced.formula_font': '公式字体模式（正则）',
        'settings.advanced.formula_font.placeholder': '例如：CMMI|CMR',
        'settings.advanced.formula_char': '公式字符模式（正则）',
        'settings.advanced.formula_char.placeholder': '例如：[∫∬∭∮∯∰∇∆]',
        'settings.advanced.btn.save': '保存高级设置',

        // Rate Limiting Settings
        'settings.rate.title': '翻译速率限制',
        'settings.rate.mode': '速率限制模式',
        'settings.rate.mode.rpm': 'RPM（每分钟请求数）',
        'settings.rate.mode.concurrent': '并发线程',
        'settings.rate.mode.custom': '自定义（QPS + 工作线程）',
        'settings.rate.rpm': '每分钟请求数',
        'settings.rate.concurrent': '并发线程数',
        'settings.rate.qps': 'QPS（每秒查询数）',
        'settings.rate.workers': '线程池最大工作线程',
        'settings.rate.term.title': '术语提取速率限制',
        'settings.rate.term.service': '术语服务',
        'settings.rate.term.service.same': '与翻译服务相同',
        'settings.rate.term.mode': '术语速率限制模式',
        'settings.rate.term.rpm': '术语RPM',
        'settings.rate.term.concurrent': '术语并发线程',
        'settings.rate.term.qps': '术语QPS',
        'settings.rate.term.workers': '术语线程池工作线程',
        'settings.rate.btn.save': '保存速率限制设置',

        // BabelDOC Settings
        'settings.babeldoc.title': 'BabelDOC高级选项',
        'settings.babeldoc.merge_lines': '合并交替行号',
        'settings.babeldoc.merge_lines.help': '处理带有交替行号的文档',
        'settings.babeldoc.remove_formula': '移除非公式行',
        'settings.babeldoc.remove_formula.help': '移除段落区域内的非公式行',
        'settings.babeldoc.iou_threshold': '非公式行IoU阈值',
        'settings.babeldoc.iou_threshold.label': '阈值',
        'settings.babeldoc.protection_threshold': '图表保护阈值',
        'settings.babeldoc.skip_formula_offset': '跳过公式偏移计算',
        'settings.babeldoc.btn.save': '保存BabelDOC设置',

        // User Management Settings
        'settings.users.title': '用户管理',
        'settings.users.add.title': '添加新用户',
        'settings.users.add.username': '用户名',
        'settings.users.add.username.placeholder': '输入用户名',
        'settings.users.add.password': '密码',
        'settings.users.add.password.placeholder': '输入密码',
        'settings.users.add.btn': '添加用户',
        'settings.users.list.title': '现有用户',
        'settings.users.registration.btn.save': '保存注册设置',

        // Global Buttons
        'settings.global.reset': '重置为默认值',
        'settings.global.save_all': '保存所有设置',

        // Configuration Import/Export
        'settings.config.title': '配置管理',
        'settings.config.export.btn': '导出配置',
        'settings.config.export.desc': '将翻译设置下载为JSON文件',
        'settings.config.export.warning': '⚠️ 警告：导出的文件包含API密钥和敏感凭据。请妥善保管。',
        'settings.config.export.success': '配置导出成功',
        'settings.config.import.btn': '导入配置',
        'settings.config.import.desc': '上传配置文件以恢复设置',
        'settings.config.import.success': '配置导入成功',
        'settings.config.import.error': '配置导入失败',
        'settings.config.import.invalid': '无效的配置文件',

        // Registration Page
        'register.title': '创建账户',
        'register.subtitle': '注册新账户',
        'register.username': '用户名',
        'register.password': '密码',
        'register.password.confirm': '确认密码',
        'register.username.min': '至少3个字符',
        'register.password.min': '至少6个字符',
        'register.btn.register': '注册',
        'register.link.login': '已有账户？登录',
        'register.link.from_login': '没有账户？注册',
        'register.disabled.title': '注册已禁用',
        'register.disabled.message': '新用户注册当前已禁用。请联系管理员。',
        'register.success': '账户创建成功！欢迎！',
        'register.error.mismatch': '密码不匹配',

        // User Management - Registration Settings
        'settings.users.registration.title': '注册设置',
        'settings.users.registration.allow': '允许新用户注册',
        'settings.users.registration.help': '启用后，用户可以从登录页面注册新账户',
        'settings.users.registration.enabled': '注册当前已启用',
        'settings.users.registration.disabled': '注册当前已禁用',

        // Common
        'common.loading': '加载中...',
        'common.save': '保存',
        'common.cancel': '取消',
        'common.delete': '删除',
        'common.reset': '重置为默认',
        'common.saveall': '保存所有设置',
    }
};

// Current language
let currentLang = localStorage.getItem('app_lang') || 'en';

/**
 * Get translation for a key
 */
function t(key) {
    return translations[currentLang][key] || key;
}

/**
 * Set language
 */
function setLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Language ${lang} not supported`);
        return;
    }
    currentLang = lang;
    localStorage.setItem('app_lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            // For all elements, update textContent (not value)
            // This ensures buttons, labels, headings, etc. are all updated
            el.textContent = translations[currentLang][key];
        }
    });

    // Update placeholders with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.placeholder = translations[currentLang][key];
        }
    });

    // Update language selector if exists
    const langSelector = document.getElementById('lang-selector');
    if (langSelector) {
        langSelector.value = lang;
    }
}

/**
 * Initialize i18n
 */
function initI18n() {
    // Set initial language
    setLanguage(currentLang);

    // Add language selector to navigation if not exists
    const nav = document.querySelector('.nav-links');
    if (nav && !document.getElementById('lang-selector')) {
        const langItem = document.createElement('li');
        langItem.innerHTML = `
            <select id="lang-selector" class="form-select" style="padding-left: 2.5rem; background-image: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 512%22><path fill=%22%23666%22 d=%22M0 128C0 92.7 28.7 64 64 64H256h48 16H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H320 304 256 64c-35.3 0-64-28.7-64-64V128zm320 0V384H576V128H320zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276H141l19-42.8zM448 164c11 0 20 9 20 20v4h44 16c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45H448 376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z%22/></svg>'); background-repeat: no-repeat; background-position: 0.75rem center; background-size: 1.2rem;">
                <option value="en">English</option>
                <option value="zh">中文</option>
            </select>
        `;
        nav.insertBefore(langItem, nav.firstChild);

        const selector = document.getElementById('lang-selector');
        selector.value = currentLang;
        selector.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
}

// Auto-initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}

// Global i18n object for easy access
const i18n = {
    t: t,
    setLanguage: setLanguage,
    getCurrentLang: () => currentLang
};
