export const initialEmployees = [
    { id: "AD001", name: 'Rahul Sharma', department: 'IT', role: "Admin" },
    { id: "HR001", name: 'Ravi Kumar', department: 'HR', role: "HR" },
    { id: "EMP001", name: 'Rohit Gupta', department: 'Development', role: "Employee", salary: 6000, nfc: "NFC001" },
    { id: "EMP002", name: 'Priya Singh', department: 'Marketing', role: "Employee", salary: 15000, nfc: "NFC002" },
    { id: "EMP003", name: 'Amit Patel', department: 'Sales', role: "Employee", salary: 12000, nfc: "NFC003" },
    { id: "EMP004", name: 'Sneha Reddy', department: 'Design', role: "Employee", salary: 10000, nfc: "NFC004" },
];



// Helper to generate a range of attendance records
const generateAttendance = (empId, daysPresent) => {
    const records = [];
    const today = new Date();
    // Start from yesterday to leave today clear
    for (let i = 1; i <= daysPresent; i++) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        // Use YYYY-MM-DD format for consistent parsing
        records.push({
            id: `${empId}-${i}`,
            empId: empId,
            date: d.toISOString().split('T')[0],
            checkIn: "09:00:00 AM",
            checkOut: "06:00:00 PM",
            status: "Present"
        });
    }
    return records;
};

export const initialAttendanceHistory = [
    ...generateAttendance("EMP001", 7), // 7 Days Present
    ...generateAttendance("EMP002", 5), // 5 Days Present
    ...generateAttendance("EMP003", 15), // 15 Days Present
    ...generateAttendance("EMP004", 11), // 11 Days Present
];

export const initialTasks = [
    { id: 1, title: "Update Homepage Text", assignedTo: "EMP001", assignedBy: "AD001", status: "Completed", dueDate: "2025-12-20" },
    { id: 2, title: "Fix Login Page Bug", assignedTo: "EMP001", assignedBy: "HR001", status: "In Progress", dueDate: "2025-12-22" },
    { id: 3, title: "Update Navbar Logic", assignedTo: "EMP001", assignedBy: "HR001", status: "Open", dueDate: "2025-12-22" },
    { id: 4, title: "Social Media Posting", assignedTo: "EMP002", assignedBy: "HR001", status: "In Progress", dueDate: "2025-12-22" },
    { id: 5, title: "Newsletter Draft", assignedTo: "EMP002", assignedBy: "HR001", status: "Open", dueDate: "2025-12-23" },
    { id: 6, title: "Follow-up with 10 New Leads", assignedTo: "EMP003", assignedBy: "HR001", status: "In Progress", dueDate: "2025-12-22" },


];

export const initialPayrolls = [];
