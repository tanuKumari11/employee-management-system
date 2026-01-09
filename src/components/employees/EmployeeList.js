
export default function EmployeeList({ employees, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto border border-gray-200 dark:border-zinc-700 rounded-xl">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-zinc-900/50 text-gray-500 dark:text-zinc-400 text-xs uppercase font-semibold">
                    <tr>
                        <th className="p-4">Name / ID</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Info</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-700 bg-white dark:bg-zinc-800">
                    {employees.map(emp => (
                        <tr key={emp.id} className="hover:bg-gray-50/80 dark:hover:bg-zinc-700/50 transition-colors">
                            <td className="p-4">
                                <div className="font-bold text-gray-900 dark:text-white">{emp.name}</div>
                                <div className="text-gray-400 text-xs">{emp.id}</div>
                            </td>
                            <td className="p-4">
                                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${emp.role === 'Admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' :
                                    emp.role === 'HR' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300' :
                                        'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                                    }`}>{emp.role}</span>
                            </td>
                            <td className="p-4 text-gray-500 dark:text-zinc-400 text-xs space-y-1">
                                <div><span className="font-semibold text-gray-400 dark:text-zinc-500">Dept:</span> {emp.department}</div>
                                <div><span className="font-semibold text-gray-400 dark:text-zinc-500">Salary:</span> ₹{emp.salary}</div>
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => onEdit(emp)} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors group" title="Edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                    </button>
                                    <button onClick={() => onDelete(emp.id)} className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors" title="Delete">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
