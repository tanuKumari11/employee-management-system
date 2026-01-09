import { createContext, useContext, useState, useEffect } from 'react';
import { initialAttendanceHistory } from '../data/mockData';
import { useAuth } from './AuthContext';
import { useAlert } from './AlertContext';

export const AttendanceContext = createContext();

export function useAttendance() {
    return useContext(AttendanceContext);
}

export function AttendanceProvider({ children }) {
    const { currentUser } = useAuth();
    const { showAlert } = useAlert();
    const [attendanceHistory, setAttendanceHistory] = useState(initialAttendanceHistory);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = () => {
            try {
                const stored = localStorage.getItem('attendanceHistory');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    const uniqueNew = initialAttendanceHistory.filter(init =>
                        !parsed.some(p => p.id === init.id)
                    );
                    setAttendanceHistory([...parsed, ...uniqueNew]);
                } else {
                    setAttendanceHistory(initialAttendanceHistory);
                }
            } catch (e) {
                console.error("Attendance load failed", e);
                setAttendanceHistory(initialAttendanceHistory);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    useEffect(() => {
        if (!loading) localStorage.setItem('attendanceHistory', JSON.stringify(attendanceHistory));
    }, [attendanceHistory, loading]);


    const markAttendance = (status) => {
        if (!currentUser) return;
        // Use consistent 12-hour format with AM/PM
        const timestamp = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        // Use YYYY-MM-DD to ensure correct parsing
        const today = new Date().toISOString().split('T')[0];

        const todayRecord = attendanceHistory.find(r => r.empId === currentUser.id && r.date === today);

        if (status === 'Check In') {
            if (todayRecord && !todayRecord.checkOut) {
                showAlert('You are already checked in for today!', 'error');
                return;
            }
            if (todayRecord && todayRecord.checkOut) {
                showAlert('You have already completed your shift for today!', 'warning');
                return;
            }

            setAttendanceHistory(prev => [
                ...prev,
                { id: Date.now(), empId: currentUser.id, date: today, checkIn: timestamp, checkOut: null, status: 'Present' }
            ]);
            showAlert(`Successfully Checked In at ${timestamp}`, 'success');

        } else if (status === 'Check Out') {
            if (!todayRecord || todayRecord.checkOut) {
                showAlert('You must Check In first!', 'error');
                return;
            }

            setAttendanceHistory(prev =>
                prev.map(record =>
                    (record.empId === currentUser.id && record.date === today && !record.checkOut)
                        ? { ...record, checkOut: timestamp }
                        : record
                )
            );
            showAlert(`Successfully Checked Out at ${timestamp}`, 'success');
        }
    };

    const getTodayStatus = () => {
        if (!currentUser) return 'Not Started';
        const today = new Date().toISOString().split('T')[0];
        const record = attendanceHistory.find(r => r.empId === currentUser.id && r.date === today);

        if (!record) return 'Not Started';
        if (!record.checkOut) return 'Checked In';
        return 'Completed';
    };

    const calculatePresentDays = (empId, month, year) => {
        return attendanceHistory.filter(record => {
            const dateObj = new Date(record.date);
            if (isNaN(dateObj)) return false;

            const recordMonth = dateObj.toLocaleString('default', { month: 'long' });
            const recordYear = dateObj.getFullYear();

            return record.empId === empId &&
                recordMonth === month &&
                recordYear === year &&
                record.status === 'Present';
        }).length;
    };

    const value = {
        attendanceHistory,
        markAttendance,
        currentAttendanceStatus: getTodayStatus(),
        calculatePresentDays
    };

    return (
        <AttendanceContext.Provider value={value}>
            {children}
        </AttendanceContext.Provider>
    );
}
