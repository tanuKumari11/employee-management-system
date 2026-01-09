import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';

export default function TaskForm({ employees, onAssign }) {
    const [newTask, setNewTask] = useState({ title: '', assignedTo: '', dueDate: '', status: 'Open' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAssign(newTask);
        setNewTask({ title: '', assignedTo: '', dueDate: '', status: 'Open' });
    };

    return (
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 sticky top-6 transition-colors duration-300">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiEdit /> <span>Assign New Task</span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase mb-1">Task Title</label>
                    <input
                        required
                        className="w-full p-2.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400 dark:placeholder-zinc-500"
                        placeholder="e.g. Prepare Monthly Report"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase mb-1">Assign To</label>
                    <select
                        required
                        className="w-full p-2.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        value={newTask.assignedTo}
                        onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    >
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase mb-1">Due Date</label>
                    <input
                        type="date"
                        required
                        className="w-full p-2.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                </div>
                <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-colors shadow-md">
                    Assign Task
                </button>
            </form>
        </div>
    );
}
