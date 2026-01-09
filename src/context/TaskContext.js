import { createContext, useContext, useState, useEffect } from 'react';
import { initialTasks } from '../data/mockData';
import { useAuth } from './AuthContext';

export const TaskContext = createContext();

export function useTasks() {
    return useContext(TaskContext);
}

export function TaskProvider({ children }) {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState(initialTasks);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = () => {
            try {
                const stored = localStorage.getItem('tasks');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    const uniqueNew = initialTasks.filter(init =>
                        !parsed.some(p => p.id === init.id)
                    );
                    setTasks([...parsed, ...uniqueNew]);
                } else {
                    setTasks(initialTasks);
                }
            } catch (e) {
                console.error("Tasks load failed", e);
                setTasks(initialTasks);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    useEffect(() => {
        if (!loading) localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks, loading]);

    const assignTask = (newTask) => {
        setTasks(prev => [...prev, { ...newTask, id: Date.now(), assignedBy: currentUser?.id || 'System' }]);
    };

    const updateTaskStatus = (taskId, newStatus) => {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    };

    const value = {
        tasks,
        assignTask,
        updateTaskStatus
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
}
