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
        'upload.result.mono': '📥 Download Translation Only',
        'upload.result.dual': '📥 Download Bilingual',
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
        'settings.basic.cache': 'Ignore Cache',
        'settings.basic.cache.help': 'Force re-translation even if cached results exist',
        'settings.basic.btn.save': 'Save Basic Settings',

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
        'upload.result.mono': '📥 下载译文',
        'upload.result.dual': '📥 下载双语版',
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
        'settings.basic.cache': '忽略缓存',
        'settings.basic.cache.help': '即使存在缓存结果也强制重新翻译',
        'settings.basic.btn.save': '保存基础设置',

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

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = t(key);

        // Update text content or placeholder based on element type
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            if (el.hasAttribute('placeholder')) {
                el.placeholder = translation;
            }
        } else {
            el.textContent = translation;
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
            <select id="lang-selector" class="form-select" style="padding: 0.5rem; font-size: 0.875rem; background: transparent; border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-primary); cursor: pointer;">
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
