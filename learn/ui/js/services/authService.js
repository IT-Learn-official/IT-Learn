const API_BASE = 'https://itlearn.pythonanywhere.com/api';

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

export async function linkTrialProgress(trialData) {
    try {
        const response = await fetch(`${API_BASE}/trial/link`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(trialData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            return { success: false, error: data.error || 'Failed to link trial progress' };
        }
        
        return { success: true };
    } catch (error) {
        console.error('Link trial progress error:', error);
        return { success: false, error: 'Network error. Trial progress may not be linked.' };
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
