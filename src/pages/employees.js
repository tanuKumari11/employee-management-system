
import { useState, useEffect } from 'react';
import Navbar from "../components/common/Navbar";
import { useEmployees } from '../context/EmployeeContext';
import { useAuth } from '../context/AuthContext';
import { useAttendance } from '../context/AttendanceContext';
import { useAlert } from '../context/AlertContext';
import { useConfirm } from '../context/ConfirmContext';
import { useRouter } from 'next/router';
import EmployeeForm from '../components/employees/EmployeeForm';
import EmployeeList from '../components/employees/EmployeeList';
import CheckInOut from '../components/attendance/CheckInOut';
import { FiUsers } from 'react-icons/fi';

export default function Employees() {
    const { currentUser, logout, loading } = useAuth();
    const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
    const { markAttendance, currentAttendanceStatus } = useAttendance();
    const { showAlert } = useAlert();
    const { showConfirm } = useConfirm();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(null);
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        if (!loading && !currentUser) {
            router.push('/');
        }
    }, [currentUser, router, loading]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 font-medium">Loading...</div>;
    if (!currentUser) return null;

    const handleSubmit = (formData) => {
        if (isEditing) {
            updateEmployee(isEditing, formData);
            setIsEditing(null);
            setInitialData(null);
            showAlert('Employee updated successfully!', 'success');
        } else {
            addEmployee(formData);
            showAlert('Employee added successfully!', 'success');
        }
    };

    const handleEdit = (emp) => {
        setIsEditing(emp.id);
        setInitialData(emp);
    };

    const handleDelete = async (id) => {
        const confirmed = await showConfirm(
            'Delete Employee?',
            'Are you sure you want to delete this employee? This action cannot be undone.'
        );

        if (confirmed) {
            deleteEmployee(id);
            showAlert('Employee deleted successfully!', 'success');
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const isAdmin = currentUser.role === 'Admin';
    const isHR = currentUser.role === 'HR';
    const isEmployee = currentUser.role === 'Employee';

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 pb-12 transition-colors duration-300">
            <Navbar />
            <div className="container mx-auto p-4 md:p-6 max-w-7xl">

                {/* --- HEADER / USER INFO --- */}
                <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 transition-colors duration-300">
                    <div>
                        <div className="text-sm text-gray-400 dark:text-zinc-500 font-medium mb-1">WELCOME BACK</div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{currentUser.name}</h1>
                        <div className="flex flex-wrap gap-3 text-sm font-medium">
                            <span className="bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300 px-3 py-1 rounded-md border border-gray-200 dark:border-zinc-600">ID: {currentUser.id}</span>
                            <span className={`px-3 py-1 rounded-md border ${isAdmin ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-800' :
                                isHR ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-100 dark:border-orange-800' :
                                    'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800'
                                }`}>Role: {currentUser.role}</span>

                            {!isAdmin && !isHR && (
                                <>
                                    <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-md border border-green-100 dark:border-green-800">Dept: {currentUser.department}</span>
                                    <span className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-md border border-yellow-100 dark:border-yellow-800">Salary: ₹{currentUser.salary}</span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="mt-6 md:mt-0 flex flex-col items-end">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors font-medium border border-red-100 dark:border-red-900/50"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- LEFT COLUMN: MANAGEMENT (Admin & HR) --- */}
                    {(isAdmin || isHR) && (
                        <div className="lg:col-span-3 space-y-8">
                            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 transition-colors duration-300">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                        <FiUsers className="text-2xl" /> <span>Employee Management</span>
                                    </h2>
                                    <span className="bg-gray-100 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400 text-xs px-2 py-1 rounded">Admin & HR Access</span>
                                </div>

                                <EmployeeForm
                                    onSubmit={handleSubmit}
                                    isEditing={isEditing}
                                    initialData={initialData}
                                    onCancel={() => { setIsEditing(null); setInitialData(null); }}
                                />

                                <EmployeeList
                                    employees={employees.filter(e => e.role === 'Employee')}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            </div>
                        </div>
                    )}

                    {/* --- RIGHT COLUMN: NFC ATTENDANCE (Employee ONLY) --- */}
                    {isEmployee && (
                        <div className="lg:col-span-1 lg:col-start-2">
                            <div className="sticky top-6">
                                <CheckInOut
                                    status={currentAttendanceStatus}
                                    onCheckIn={() => markAttendance('Check In')}
                                    onCheckOut={() => markAttendance('Check Out')}
                                    nfcId={currentUser.nfc}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
