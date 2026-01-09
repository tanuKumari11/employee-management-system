
import { useState, useEffect } from 'react';
import Navbar from "../components/common/Navbar";
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';
import { useAttendance } from '../context/AttendanceContext';
import { useRouter } from 'next/router';
import AttendanceTable from '../components/attendance/AttendanceTable';

export default function Attendance() {
    const { currentUser, loading: authLoading } = useAuth();
    const { employees } = useEmployees();
    const { attendanceHistory } = useAttendance();
    const router = useRouter();

    const [filterDate, setFilterDate] = useState('');
    const [filterEmp, setFilterEmp] = useState('');

    useEffect(() => {
        if (!authLoading && !currentUser) {
            router.push('/');
        }
    }, [currentUser, router, authLoading]);

    if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 text-zinc-500 font-medium">Loading...</div>;
    if (!currentUser) return null;

    const isAdminOrHR = currentUser.role === 'Admin' || currentUser.role === 'HR';

    // Filter logic
    const filteredHistory = attendanceHistory.filter(record => {
        // Direct string comparison works because both are YYYY-MM-DD
        const matchDate = filterDate ? record.date === filterDate : true;

        if (isAdminOrHR) {
            // Find the employee associated with this record
            const employee = employees.find(e => e.id === record.empId);
            // Only show records for regular Employees (not other Admins or HRs)
            const isEmployeeRole = employee?.role === 'Employee';

            const matchEmp = filterEmp ? record.empId.includes(filterEmp) : true;
            return matchDate && matchEmp && isEmployeeRole;
        } else {
            // Employee only sees their own
            return record.empId === currentUser.id && matchDate;
        }
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 pb-12 transition-colors duration-300">
            <Navbar />
            <div className="container mx-auto p-4 md:p-6 max-w-7xl">
                <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Attendance History</h1>
                        <p className="text-gray-500 dark:text-zinc-400">View and track daily attendance records.</p>
                    </div>
                </header>

                {/* Filters */}
                <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 mb-6 flex flex-wrap gap-4 items-center">
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase mb-1">Filter by Date</label>
                        <input
                            type="date"
                            className="border border-gray-200 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={(e) => setFilterDate(e.target.value)}
                        />
                    </div>
                    {isAdminOrHR && (
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase mb-1">Filter by Employee ID</label>
                            <input
                                type="text"
                                placeholder="e.g. EMP003"
                                className="border border-gray-200 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-48 placeholder-gray-400 dark:placeholder-zinc-500"
                                onChange={(e) => setFilterEmp(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="ml-auto">
                        <span className="text-sm font-medium text-gray-500 dark:text-zinc-400">
                            Showing {filteredHistory.length} records
                        </span>
                    </div>
                </div>

                <AttendanceTable history={filteredHistory} employees={employees} />
            </div>
        </div>
    );
}
