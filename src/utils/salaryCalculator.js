
export const countMonthlyAttendance = (attendanceHistory, empId, month, year) => {
    return attendanceHistory.filter(record => {
        const recordDate = new Date(record.date);

        const dateObj = new Date(record.date);

        if (isNaN(dateObj)) return false;

        const recordMonth = dateObj.toLocaleString('default', { month: 'long' });
        const recordYear = dateObj.getFullYear();

        return record.empId === empId && recordMonth === month && recordYear === year && record.status === 'Present';
    }).length;
};

export const calculateNetSalary = (basicSalary, daysPresent) => {
    const salary = Number(basicSalary);
    const dailyRate = salary / 30;
    return Math.round(dailyRate * daysPresent);
};
