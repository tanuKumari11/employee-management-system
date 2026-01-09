import { createContext, useContext, useState, useEffect } from 'react';
import { initialEmployees } from '../data/mockData';

// Create the context
export const EmployeeContext = createContext();

// Create a custom hook for easy access
export function useEmployees() {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error('EmployeeContext must be used within an EmployeeProvider');
    }
    return context;
}

// Create the provider component
export function EmployeeProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState(initialEmployees);

    useEffect(() => {
        // Load state from localStorage on mount
        const loadState = () => {
            try {
                const storedEmployees = localStorage.getItem('employees');
                if (storedEmployees) {
                    const parsed = JSON.parse(storedEmployees);
                    // Merge new initial employees if they don't exist in storage
                    const uniqueNew = initialEmployees.filter(init =>
                        !parsed.some(p => p.id === init.id)
                    );
                    setEmployees([...parsed, ...uniqueNew]);
                } else {
                    setEmployees(initialEmployees);
                }
            } catch (error) {
                console.error("Failed to load state from local storage:", error);
                setEmployees(initialEmployees);
            } finally {
                setLoading(false);
            }
        };

        loadState();
    }, []);

    // Save state changes
    useEffect(() => {
        if (!loading) localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees, loading]);

    // Add employee function
    const addEmployee = (employee) => {
        setEmployees(prev => [...prev, { ...employee }]);
    };

    // Update employee function
    const updateEmployee = (id, updatedData) => {
        setEmployees(prev =>
            prev.map(emp => emp.id === id ? { ...emp, ...updatedData } : emp)
        );
    };

    // Delete employee function
    const deleteEmployee = (id) => {
        setEmployees(prev => {
            const updated = prev.filter(emp => emp.id !== id);
            return updated;
        });
    };

    const value = {
        loading,
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee
    };

    return (
        <EmployeeContext.Provider value={value}>
            {children}
        </EmployeeContext.Provider>
    );
}
