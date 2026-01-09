import { useEffect, useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';

export default function Alert({ message, type = 'info', onClose }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger enter animation
        setIsVisible(true);
        return () => setIsVisible(false);
    }, []);

    const getStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
            case 'error':
                return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
            case 'warning':
                return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
            default:
                return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success': return <FiCheckCircle className="w-6 h-6" />;
            case 'error': return <FiAlertCircle className="w-6 h-6" />;
            case 'warning': return <FiAlertTriangle className="w-6 h-6" />;
            default: return <FiInfo className="w-6 h-6" />;
        }
    };

    return (
        <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className={`flex items-center gap-3 px-6 py-4 rounded-xl border shadow-lg ${getStyles()} max-w-sm`}>
                <span className="text-xl shrink-0">{getIcon()}</span>
                <p className="font-medium text-sm">{message}</p>
                <button
                    onClick={onClose}
                    className="ml-auto text-current opacity-60 hover:opacity-100 transition-opacity p-1"
                >
                    <FiX className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
