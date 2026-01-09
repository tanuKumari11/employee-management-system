import { useEffect, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleClose = (action) => {
        setIsVisible(false);
        setTimeout(action, 200); // Wait for animation to finish
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'bg-black/40 backdrop-blur-sm opacity-100' : 'bg-black/0 opacity-0'}`}>
            <div className={`bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 dark:border-zinc-700 transform transition-all duration-300 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>

                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="shrink-0 bg-red-100 dark:bg-red-900/30 p-3 rounded-full text-red-600 dark:text-red-400">
                            <FiAlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                            <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">{message}</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-zinc-900/50 rounded-b-2xl border-t border-gray-100 dark:border-zinc-700 flex justify-end gap-3">
                    <button
                        onClick={() => handleClose(onCancel)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors focus:ring-2 focus:ring-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleClose(onConfirm)}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                    >
                        Confirm Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
