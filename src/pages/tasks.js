
import { useEffect } from 'react';
import Navbar from "../components/common/Navbar";
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';
import { useTasks } from '../context/TaskContext';
import { useAlert } from '../context/AlertContext';
import { useRouter } from 'next/router';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';

export default function Tasks() {
    const { currentUser, loading: authLoading } = useAuth();
    const { employees } = useEmployees();
    const { tasks, assignTask, updateTaskStatus } = useTasks();
    const { showAlert } = useAlert();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !currentUser) {
            router.push('/');
        }
    }, [currentUser, router, authLoading]);

    if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 text-zinc-500 font-medium">Loading...</div>;
    if (!currentUser) return null;

    const isAdminOrHR = currentUser.role === 'Admin' || currentUser.role === 'HR';

    // Filter tasks
    const displayTasks = isAdminOrHR
        ? tasks.filter(t => {
            const assignedToEmp = employees.find(e => e.id === t.assignedTo);
            return assignedToEmp?.role === 'Employee';
        })
        : tasks.filter(t => t.assignedTo === currentUser.id);

    // Add Task Handler
    const handleAssign = (newTask) => {
        assignTask({ ...newTask, assignedBy: currentUser.id });
        showAlert('Task assigned successfully!', 'success');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 pb-12 transition-colors duration-300">
            <Navbar />
            <div className="container mx-auto p-4 md:p-6 max-w-7xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Task Management</h1>
                    <p className="text-gray-500 dark:text-zinc-400">
                        {isAdminOrHR ? 'Assign and track team tasks.' : 'Manage your assigned tasks.'}
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- TASK LIST (Admin sees All, Emp sees Theirs) --- */}
                    <div className={`${isAdminOrHR ? "lg:col-span-2" : "lg:col-span-3"} order-2 lg:order-1`}>
                        <TaskList
                            tasks={displayTasks}
                            employees={employees}
                            currentUser={currentUser}
                            onUpdateStatus={updateTaskStatus}
                            isAdminOrHR={isAdminOrHR}
                        />
                    </div>

                    {/* --- ADMIN/HR SIDE: ASSIGN TASK --- */}
                    {isAdminOrHR && (
                        <div className="lg:col-span-1 order-1 lg:order-2">
                            <TaskForm employees={employees.filter(e => e.role === 'Employee')} onAssign={handleAssign} />
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
