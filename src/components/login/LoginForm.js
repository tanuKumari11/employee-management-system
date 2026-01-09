import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEmployees } from '../../context/EmployeeContext';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
    const [employeeId, setEmployeeId] = useState('');
    const [error, setError] = useState('');
    const { employees } = useEmployees();
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        // Basic validation
        if (!employeeId.trim()) {
            setError('Please enter an Employee ID');
            return;
        }

        // Check if user exists (simple check before context login to show error)
        const userExists = employees.find(e => e.id === employeeId);

        if (userExists) {
            login(employeeId, employees);
            router.push('/employees');
        } else {
            setError('Invalid Employee ID');
        }
    };

    return (
        <div className="bg-zinc-50 dark:bg-black w-full max-w-md">
            <div className="flex flex-col justify-center h-full p-8 md:p-1">
                <h1 className="text-4xl font-bold mb-4 mt-4 text-zinc-900 dark:text-zinc-100">Login</h1>
                <span className="text-zinc-700 dark:text-zinc-300 mb-8">Please enter your credentials to login</span>

                <form onSubmit={handleLogin} className="flex flex-col w-full">
                    <input
                        type="text"
                        placeholder="Employee ID (e.g., EMP001)"
                        value={employeeId}
                        onChange={(e) => { setEmployeeId(e.target.value); setError(''); }}
                        className="border border-zinc-300 dark:border-zinc-700 rounded-md p-3 mb-4 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors shadow-md">
                        Login
                    </button>

                    {/* Helper for demo purposes */}
                    <div className="mt-6 text-xs text-gray-400 bg-gray-100 dark:bg-zinc-900 p-3 rounded">
                        <p className="font-bold mb-1">Demo Credentials:</p>
                        <p>Admin: AD001</p>
                        <p>HR: HR001</p>
                        <p>Employee 1: EMP001</p>
                        <p>Employee 2: EMP002</p>
                        <p>Employee 3: EMP003</p>
                        <p>Employee 4: EMP004</p>
                    </div>
                </form>
            </div>
        </div>
    );
}