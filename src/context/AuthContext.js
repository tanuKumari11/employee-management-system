import { createContext, useContext, useState, useEffect } from 'react';
import { initialEmployees } from '../data/mockData';
import { useEmployees } from './EmployeeContext';

export const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = () => {
            try {
                const storedUser = localStorage.getItem('currentUser');
                if (storedUser) setCurrentUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to load user", error);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    useEffect(() => {
        if (!loading) {
            if (currentUser) localStorage.setItem('currentUser', JSON.stringify(currentUser));
            else localStorage.removeItem('currentUser');
        }
    }, [currentUser, loading]);

    const login = (employeeId, allEmployees) => {
        const user = allEmployees.find(e => e.id === employeeId);
        if (user) {
            setCurrentUser(user);
            return true;
        }
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
