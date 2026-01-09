
export default function AttendanceTable({ history, employees }) {

    const getEmpName = (id) => employees.find(e => e.id === id)?.name || id;

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-zinc-900/50 text-gray-500 dark:text-zinc-400 text-xs uppercase font-semibold">
                    <tr>
                        <th className="p-4">Date</th>
                        <th className="p-4">Employee</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Check In</th>
                        <th className="p-4">Check Out</th>
                        <th className="p-4">Work Hours</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-700">
                    {history.length > 0 ? (
                        history.map(record => (
                            <tr key={record.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-700/50 transition-colors">
                                <td className="p-4 font-medium text-gray-900 dark:text-white">{record.date}</td>
                                <td className="p-4">
                                    <div className="font-bold text-gray-800 dark:text-zinc-200">{getEmpName(record.empId)}</div>
                                    <div className="text-xs text-gray-400">{record.empId}</div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                        {record.status}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-600 dark:text-zinc-400 font-mono tracking-tight">{record.checkIn}</td>
                                <td className="p-4 text-gray-600 dark:text-zinc-400 font-mono tracking-tight">{record.checkOut || '-'}</td>
                                <td className="p-4 text-gray-500 dark:text-zinc-500">
                                    {(() => {
                                        if (!record.checkIn || !record.checkOut) return '-';

                                        const parseTime = (timeStr) => {
                                            const [time, modifier] = timeStr.split(' ');
                                            let [hours, minutes, seconds] = time.split(':');

                                            if (!seconds) seconds = '00'; // Handle missing seconds

                                            let h = parseInt(hours, 10);
                                            if (h === 12 && modifier === 'AM') h = 0;
                                            if (h !== 12 && modifier === 'PM') h += 12;

                                            // Ensure 2-digit format for ISO string
                                            const hh = h.toString().padStart(2, '0');
                                            const mm = minutes.toString().padStart(2, '0');
                                            const ss = seconds.toString().padStart(2, '0');

                                            return new Date(`2000-01-01T${hh}:${mm}:${ss}`);
                                        };

                                        try {
                                            const start = parseTime(record.checkIn);
                                            const end = parseTime(record.checkOut);
                                            const diff = end - start;

                                            const hours = Math.floor(diff / 1000 / 60 / 60);
                                            const minutes = Math.floor((diff / 1000 / 60) % 60);
                                            return `${hours}h ${minutes}m`;
                                        } catch (e) {
                                            return 'Error';
                                        }
                                    })()}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="p-8 text-center text-gray-400 dark:text-zinc-500 italic">
                                No attendance records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
