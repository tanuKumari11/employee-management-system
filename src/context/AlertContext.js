import { createContext, useContext, useState, useCallback } from 'react';
import Alert from '../components/common/Alert';

const AlertContext = createContext();

export function useAlert() {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
}

export function AlertProvider({ children }) {
    const [alert, setAlert] = useState(null);

    const showAlert = useCallback((message, type = 'info', duration = 3000) => {
        setAlert({ message, type });
        if (duration) {
            setTimeout(() => {
                setAlert(null);
            }, duration);
        }
    }, []);

    const hideAlert = useCallback(() => {
        setAlert(null);
    }, []);

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            {alert && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={hideAlert}
                />
            )}
        </AlertContext.Provider>
    );
}
