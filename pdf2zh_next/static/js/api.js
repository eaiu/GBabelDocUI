/**
 * API Client for PDFMathTranslate Web UI
 * Handles all HTTP requests to the backend API
 */

const API_BASE_URL = window.location.origin;

class APIClient {
  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  /**
   * Get authorization headers
   */
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Make an API request
   */
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Handle 401 Unauthorized
      if (response.status === 401) {
        this.clearToken();
        window.location.href = '/login.html';
        throw new Error('Unauthorized');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * Set authentication token
   */
  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  /**
   * Clear authentication token
   */
  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
  }

  /**
   * Check authentication status
   */
  async checkAuthStatus() {
    return this.request('/api/auth/status');
  }

  /**
   * Initial setup (create first admin user)
   */
  async setup(username, password) {
    const response = await this.request('/api/auth/setup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (response.success) {
      this.setToken(response.token);
      localStorage.setItem('user_info', JSON.stringify({
        username: response.username,
        is_admin: response.is_admin,
      }));
    }

    return response;
  }

  /**
   * Login
   */
  async login(username, password) {
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (response.success) {
      this.setToken(response.token);
      localStorage.setItem('user_info', JSON.stringify({
        username: response.username,
        is_admin: response.is_admin,
      }));
    }

    return response;
  }

  /**
   * Logout
   */
  async logout() {
    try {
      await this.request('/api/auth/logout', { method: 'POST' });
    } finally {
      this.clearToken();
      window.location.href = '/login.html';
    }
  }

  /**
   * Register new user (admin only)
   */
  async register(username, password) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  /**
   * List all users (admin only)
   */
  async listUsers() {
    return this.request('/api/auth/users');
  }

  /**
   * Delete user (admin only)
   */
  async deleteUser(username) {
    return this.request(`/api/auth/users/${username}`, {
      method: 'DELETE',
    });
  }

  /**
   * Check if registration is enabled (public)
   */
  async checkRegistrationStatus() {
    return this.request('/api/auth/registration-status');
  }

  /**
   * Toggle registration setting (admin only)
   */
  async toggleRegistration(enabled) {
    return this.request('/api/auth/registration-toggle', {
      method: 'POST',
      body: JSON.stringify({ enabled }),
    });
  }

  /**
   * Public user registration
   */
  async registerPublic(username, password) {
    const response = await this.request('/api/auth/register/public', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (response.success && response.token) {
      this.setToken(response.token);
      localStorage.setItem('user_info', JSON.stringify({
        username: response.username,
        is_admin: response.is_admin,
      }));
    }

    return response;
  }

  /**
   * Get user settings
   */
  async getSettings() {
    return this.request('/api/settings');
  }

  /**
   * Update user settings
   */
  async updateSettings(settings) {
    return this.request('/api/settings', {
      method: 'POST',
      body: JSON.stringify(settings),
    });
  }

  /**
   * Change password
   */
  async changePassword(oldPassword, newPassword) {
    return this.request('/api/settings/password', {
      method: 'POST',
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });
  }

  /**
   * Reset settings to default
   */
  async resetSettings() {
    return this.request('/api/settings/reset', {
      method: 'POST',
    });
  }

  /**
   * Export settings as JSON file
   */
  async exportSettings() {
    const response = await fetch(`${API_BASE_URL}/api/settings/export`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to export settings');
    }

    // Get filename from Content-Disposition header or use default
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = 'translation_config.json';
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match) filename = match[1];
    }

    // Download file
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return { success: true, filename };
  }

  /**
   * Import settings from JSON file
   */
  async importSettings(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/settings/import`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to import settings');
    }

    return response.json();
  }

  /**
   * Upload file
   */
  async uploadFile(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = (e.loaded / e.total) * 100;
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error('Upload failed'));
        }
      });

      xhr.addEventListener('error', () => reject(new Error('Upload failed')));

      xhr.open('POST', `${API_BASE_URL}/api/upload`);
      xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      xhr.send(formData);
    });
  }

  /**
   * Start translation
   */
  async startTranslation(fileId, settings) {
    const formData = new FormData();
    formData.append('file_id', fileId);
    formData.append('settings', JSON.stringify(settings));

    const response = await fetch(`${API_BASE_URL}/api/translate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Translation failed to start');
    }

    return response.json();
  }

  /**
   * Get translation status
   */
  async getTranslationStatus(taskId) {
    return this.request(`/api/translate/status/${taskId}`);
  }

  /**
   * Get translation history
   */
  async getTranslationHistory() {
    return this.request('/api/translate/history');
  }

  /**
   * Get download URL for translated file
   */
  getDownloadUrl(taskId, fileType = 'mono') {
    return `${API_BASE_URL}/api/translate/download/${taskId}?file_type=${fileType}`;
  }

  /**
   * Delete a history item and its files
   */
  async deleteHistoryItem(taskId) {
    return this.request(`/api/translate/history/${taskId}`, {
      method: 'DELETE'
    });
  }
}

// Export singleton instance
const api = new APIClient();
