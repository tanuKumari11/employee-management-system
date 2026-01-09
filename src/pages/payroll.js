import { useState, useEffect } from 'react';
import Navbar from "../components/common/Navbar";
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';
import { useAttendance } from '../context/AttendanceContext';
import { useAlert } from '../context/AlertContext';
import { useRouter } from 'next/router';
import { generatePaySlip } from '../utils/pdfGenerator';
import { calculateNetSalary } from '../utils/salaryCalculator';
import { FiInbox } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';

export default function Payroll() {
    const { currentUser, loading: authLoading } = useAuth();
    const { employees } = useEmployees();
    const { attendanceHistory, calculatePresentDays } = useAttendance();
    const { showAlert } = useAlert();
    const router = useRouter();
    const [isGenerating, setIsGenerating] = useState(false);
    const [payrolls, setPayrolls] = useState([]);

    useEffect(() => {
        if (!authLoading && !currentUser) {
            router.push('/');
        }
    }, [currentUser, router, authLoading]);

    // Load initial payrolls if stored (optional, for now we generate on fly or keep state)
    // For this refactor, let's keep it simple: State is local to this page component OR 
    // ideally moved to a PayrollContext if we needed persistence across pages.
    // The previous implementation had it in EmployeeContext.
    // Let's implement local state for payrolls, or if we want persistence, we can use localStorage here too.
    useEffect(() => {
        const stored = localStorage.getItem('payrolls');
        if (stored) setPayrolls(JSON.parse(stored));
    }, []);

    useEffect(() => {
        if (payrolls.length > 0) localStorage.setItem('payrolls', JSON.stringify(payrolls));
    }, [payrolls]);


    if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 text-zinc-500 font-medium">Loading...</div>;
    if (!currentUser) return null;

    const isAdminOrHR = currentUser.role === 'Admin' || currentUser.role === 'HR';

    // Payroll Data
    const myPayroll = payrolls.filter(p => p.empId === currentUser.id);
    const displayPayrolls = isAdminOrHR
        ? payrolls.filter(p => {
            const emp = employees.find(e => e.id === p.empId);
            return emp?.role === 'Employee';
        })
        : myPayroll;

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const currentMonth = new Date().toLocaleString('default', { month: 'long' });
            const currentYear = new Date().getFullYear();

            // Only generate for "Employee" role
            const eligibleEmployees = employees.filter(e => e.role === 'Employee');

            const newPayrolls = eligibleEmployees.map(emp => {
                const daysPresent = calculatePresentDays(emp.id, currentMonth, currentYear);
                const netSalary = calculateNetSalary(emp.salary, daysPresent);

                const perDaySalary = Math.round(emp.salary / 30);

                return {
                    id: `${emp.id}-${currentMonth}-${currentYear}`,
                    empId: emp.id,
                    name: emp.name,
                    department: emp.department,
                    role: emp.role,
                    month: currentMonth,
                    year: currentYear,
                    basicSalary: emp.salary,
                    perDaySalary: perDaySalary,
                    totalWorkingDays: 30, // Standardized for calculation
                    daysPresent: daysPresent,
                    netSalary: netSalary,
                    generatedBy: currentUser.role // Track who generated this for the PDF
                };
            });

            setPayrolls(newPayrolls);
            setIsGenerating(false);
            if (newPayrolls.length > 0) {
                showAlert(`Payroll generated for ${newPayrolls.length} employees!`, 'success');
            }
        }, 1500);
    };

    const handleDownload = (id) => {
        const slip = payrolls.find(p => p.id === id);
        if (slip) {
            generatePaySlip(slip);
            showAlert('Pay slip downloaded successfully!', 'success');
        } else {
            showAlert("Error: Pay slip not found!", 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 pb-12 transition-colors duration-300">
            <Navbar />
            <div className="container mx-auto p-4 md:p-6 max-w-7xl">
                <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Payroll Management</h1>
                        <p className="text-gray-500 dark:text-zinc-400">
                            {isAdminOrHR ? 'Calculate and manage employee salaries.' : 'View your monthly payslips.'}
                        </p>
                    </div>

                    {/* Admin Action */}
                    {isAdminOrHR && (
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className={`mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white shadow-lg transition-all ${isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:scale-95'
                                }`}
                        >
                            {isGenerating ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <FaRupeeSign className="text-xl" />
                                    <span>Process Current Month Payroll</span>
                                </>
                            )}
                        </button>
                    )}
                </header>

                {/* Payroll List */}
                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 overflow-x-auto text-sm transition-colors duration-300">
                    {displayPayrolls.length > 0 ? (
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 dark:bg-zinc-900/50 text-gray-500 dark:text-zinc-400 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="p-4">Period</th>
                                    <th className="p-4">Employee</th>
                                    <th className="p-4 text-center">Days Present</th>
                                    <th className="p-4 text-right">Basic Salary</th>
                                    <th className="p-4 text-right">Net Pay</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-zinc-700">
                                {displayPayrolls.map(slip => (
                                    <tr key={slip.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-700/50 transition-colors">
                                        <td className="p-4">
                                            <span className="font-bold text-gray-700 dark:text-zinc-300">{slip.month} {slip.year}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-gray-900 dark:text-white">{slip.name}</div>
                                            <div className="text-xs text-gray-400">{slip.empId}</div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className="inline-block px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded text-xs font-bold">
                                                {slip.daysPresent} Days
                                            </span>
                                        </td>
                                        <td className="p-4 text-right text-gray-500 dark:text-zinc-400">₹{slip.basicSalary.toLocaleString()}</td>
                                        <td className="p-4 text-right">
                                            <span className="text-green-600 dark:text-green-400 font-bold text-base">₹{slip.netSalary.toLocaleString()}</span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => handleDownload(slip.id)}
                                                className="text-gray-400 hover:text-blue-600 dark:text-zinc-500 dark:hover:text-blue-400 transition-colors p-2"
                                                title="Download Slip"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-16 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-700 rounded-full flex items-center justify-center mb-4 text-gray-400 dark:text-zinc-400">
                                <FiInbox className="text-3xl" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-700 dark:text-zinc-200 mb-2">No Payroll Records</h3>
                            <p className="text-gray-500 dark:text-zinc-400 max-w-sm">
                                {isAdminOrHR
                                    ? "Click the 'Process Current Month Payroll' button to generate salary slips for all employees based on their attendance."
                                    : "Payroll for this month hasn't been processed yet. Please check back later."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
