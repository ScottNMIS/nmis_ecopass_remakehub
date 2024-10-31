// api_calls.js
const API_BASE_URL = '/api';

export const authApi = {
    async login(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include', // This is important for handling cookies
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Login failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    },

    async register(email, password, name) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Registration failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    },

    async logout() {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            return true;
        } catch (error) {
            throw error;
        }
    },

    async getCurrentUser() {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to get user info');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
};