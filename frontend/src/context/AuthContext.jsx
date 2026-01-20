import { useState } from 'react';
import { AuthContext } from './AuthContextDecl';
import api from '../api/axios';



export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== "undefined") {
            try {
                return JSON.parse(storedUser);
            } catch (error) {
                console.error("Failed to parse user from local storage", error);
                localStorage.removeItem('user');
            }
        }
        return null;
    });

    // Register
    const register = async (data) => {
        const res = await api.post('/auth/register', data);
        handleAuthSuccess(res.data.data);
    };

    // Login
    const login = async (data) => {
        const res = await api.post('/auth/login', data);
        handleAuthSuccess(res.data.data);
    };

    const handleAuthSuccess = ({ token, user }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    // Logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


