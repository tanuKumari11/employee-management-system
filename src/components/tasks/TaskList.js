
export default function TaskList({ tasks, employees, currentUser, onUpdateStatus, isAdminOrHR }) {

    const getEmpName = (id) => employees.find(e => e.id === id)?.name || id;

    const statusColors = {
        'Open': 'bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-zinc-300',
        'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        'Completed': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
    };

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 overflow-hidden transition-colors duration-300">
            <div className="p-4 bg-gray-50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-zinc-700 flex justify-between items-center">
                <h2 className="font-bold text-gray-700 dark:text-zinc-200">
                    {isAdminOrHR ? 'All Tasks Overview' : 'My Assigned Tasks'}
                </h2>
                <span className="text-xs font-medium text-gray-400 dark:text-zinc-500 bg-white dark:bg-zinc-800 px-2 py-1 rounded border dark:border-zinc-700">
                    {tasks.length} Todos
                </span>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-zinc-700">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <div key={task.id} className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors group">
                            <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{task.title}</h3>
                                    <div className="text-xs text-gray-500 dark:text-zinc-400 mt-1 flex flex-wrap gap-2">
                                        <span>Due: {task.dueDate}</span>
                                        <span className="text-gray-300 dark:text-zinc-600">|</span>
                                        <span>Assigned To: <span className="text-gray-700 dark:text-zinc-300 font-medium">{getEmpName(task.assignedTo)}</span></span>
                                        {isAdminOrHR && (
                                            <>
                                                <span className="text-gray-300 dark:text-zinc-600">|</span>
                                                <span>By: {getEmpName(task.assignedBy)}</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Status Control */}
                                <div className="w-full sm:w-auto flex justify-end sm:block">
                                    {currentUser.id === task.assignedTo || isAdminOrHR ? (
                                        <select
                                            className={`text-xs font-bold uppercase py-1 px-2 rounded border-0 cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-200 dark:focus:ring-blue-900 ${statusColors[task.status]}`}
                                            value={task.status}
                                            onChange={(e) => onUpdateStatus(task.id, e.target.value)}
                                        >
                                            <option value="Open">Open</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    ) : (
                                        <span className={`text-xs font-bold uppercase py-1 px-2 rounded ${statusColors[task.status]}`}>
                                            {task.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center text-gray-400 dark:text-zinc-500">
                        <p>No tasks found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
