// Authentication Service for IT Learn
// Handles login, signup, logout, and session management

const API_BASE = 'https://itlearn.pythonanywhere.com/api';

/**
 * Check if user is logged in
 * @returns {Promise<{logged_in: boolean, user_id: string|null}>}
 */
export async function checkSession() {
    try {
        const response = await fetch(`${API_BASE}/session`, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Session check failed:', error);
        return { logged_in: false, user_id: null };
    }
}

/**
 * Login user
 * @param {string} email 
 * @param {string} password 
 * @param {string} captchaToken - Turnstile CAPTCHA token
 * @returns {Promise<{success: boolean, user_id?: string, error?: string}>}
 */
export async function login(email, password, captchaToken) {
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password,
                captcha_token: captchaToken
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            return { success: false, error: data.error || 'Login failed' };
        }
        
        return { success: true, user_id: data.user_id };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Network error. Please try again.' };
    }
}

/**
 * Sign up new user
 * @param {string} email 
 * @param {string} password 
 * @param {string} captchaToken - Turnstile CAPTCHA token
 * @returns {Promise<{success: boolean, user_id?: string, error?: string}>}
 */
export async function signup(email, password, captchaToken) {
    try {
        const response = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password,
                captcha_token: captchaToken
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            return { success: false, error: data.error || 'Signup failed' };
        }
        
        return { success: true, user_id: data.user_id };
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, error: 'Network error. Please try again.' };
    }
}

/**
 * Logout user
 * @returns {Promise<{success: boolean}>}
 */
export async function logout() {
    try {
        const response = await fetch(`${API_BASE}/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        
        const data = await response.json();
        return { success: data.success };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false };
    }
}

/**
 * Load user progress
 * @returns {Promise<Object>} Progress data
 */
export async function loadProgress() {
    try {
        const response = await fetch(`${API_BASE}/progress/load`, {
            method: 'POST',
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error('Failed to load progress');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Load progress error:', error);
        return {
            progress: {},
            xp: 0,
            streak: 0,
            last_active: null,
            missions: {},
            mistakes: []
        };
    }
}

/**
 * Save user progress
 * @param {Object} progressData - Progress data to save
 * @returns {Promise<{success: boolean}>}
 */
export async function saveProgress(progressData) {
    try {
        const response = await fetch(`${API_BASE}/progress/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                progress_data: progressData
            })
        });
        
        const data = await response.json();
        return { success: data.success || false };
    } catch (error) {
        console.error('Save progress error:', error);
        return { success: false };
    }
}

/**
 * Get total user count
 * @returns {Promise<{totalUsers: string}>}
 */
export async function getUserCount() {
    try {
        const response = await fetch(`${API_BASE}/user-count`, {
            method: 'GET'
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('User count error:', error);
        return { totalUsers: '0+' };
    }
}

/**
 * Change user password
 * @param {string} newPassword - New password
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function changePassword(newPassword) {
    try {
        const response = await fetch(`${API_BASE}/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                new_password: newPassword
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            return { success: false, error: data.error || 'Password change failed' };
        }
        
        return { success: true };
    } catch (error) {
        console.error('Change password error:', error);
        return { success: false, error: 'Network error. Please try again.' };
    }
}

/**
 * Delete user account
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function deleteAccount() {
    try {
        const response = await fetch(`${API_BASE}/delete-account`, {
            method: 'POST',
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            return { success: false, error: data.error || 'Account deletion failed' };
        }
        
        return { success: true };
    } catch (error) {
        console.error('Delete account error:', error);
        return { success: false, error: 'Network error. Please try again.' };
    }
}
