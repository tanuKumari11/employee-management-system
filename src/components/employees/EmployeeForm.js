
import { useState, useEffect } from 'react';

export default function EmployeeForm({ onSubmit, initialData, isEditing, onCancel }) {
    const [formData, setFormData] = useState({
        id: '', name: '', department: '', role: 'Employee', salary: '', nfc: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ id: '', name: '', department: '', role: 'Employee', salary: '', nfc: '' });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        if (!isEditing) {
            setFormData({ id: '', name: '', department: '', role: 'Employee', salary: '', nfc: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50/50 dark:bg-zinc-700/30 p-6 rounded-xl border border-dashed border-gray-300 dark:border-zinc-600">
            <h3 className="text-sm font-bold uppercase tracking-wide mb-4 text-gray-500 dark:text-zinc-400 flex justify-between items-center">
                {isEditing ? 'Edit Existing Employee' : 'Add New Employee'}
                {isEditing && <span className="text-orange-500 text-xs">Editing Mode</span>}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="col-span-1">
                    <input required name="id" placeholder="Employee ID" value={formData.id} onChange={handleChange} className="w-full p-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400 dark:placeholder-zinc-500" disabled={!!isEditing} />
                </div>
                <div className="col-span-1">
                    <input required name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400 dark:placeholder-zinc-500" />
                </div>
                <div className="col-span-1">
                    <input required name="department" placeholder="Department" value={formData.department} onChange={handleChange} className="w-full p-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400 dark:placeholder-zinc-500" />
                </div>
                <div className="col-span-1">
                    <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                        <option value="Admin">Admin</option>
                        <option value="HR">HR</option>
                        <option value="Employee">Employee</option>
                    </select>
                </div>
                <div className="col-span-1">
                    <input required name="salary" type="number" placeholder="Salary" value={formData.salary} onChange={handleChange} className="w-full p-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400 dark:placeholder-zinc-500" />
                </div>
                <div className="col-span-1">
                    <input required name="nfc" placeholder="NFC Tag ID" value={formData.nfc} onChange={handleChange} className="w-full p-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400 dark:placeholder-zinc-500" />
                </div>
            </div>
            <div className="flex gap-3">
                <button type="submit" className={`px-6 py-2.5 rounded-lg text-white text-sm font-semibold shadow-md transition-all flex-1 ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-900 dark:bg-zinc-600 hover:bg-gray-800 dark:hover:bg-zinc-500'}`}>
                    {isEditing ? 'Update Details' : '+ Add Employee'}
                </button>
                {isEditing && (
                    <button type="button" onClick={onCancel} className="px-6 py-2.5 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-zinc-300 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}