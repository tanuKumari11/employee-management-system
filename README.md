📌 Overview

This project is a **Basic Employee Management System (EMS)** built to demonstrate practical understanding of
modern frontend development concepts using **React (Next.js)**.

The application focuses on real-world HR workflows such as employee management, attendance tracking,
payroll calculation, and task management, with an emphasis on clean architecture and scalable UI design.


🎯 Project Goals
The objective of this project is to design and implement a functional Employee Management System that showcases:

- Component-based frontend architecture
- Role-based access control
- Business logic implementation (attendance & payroll)
- Clean, maintainable, and readable code structure

🧩 Key Features
👤 User Roles

Admin

HR

Employee

Each role has controlled access to features based on responsibilities.

🧑‍💼 Employee Management

(Admin / HR)

Add, update, and remove employees

View complete employee directory

Employee Attributes:

Name

Employee ID

Department

Role

Monthly Salary

RFID / NFC ID

🕒 Attendance Management

RFID / NFC-based attendance simulation

Employee check-in / check-out

Timestamp-based attendance logs

Attendance history tracking

RFID/NFC functionality is simulated to reflect real-world attendance systems without hardware dependency.

💰 Payroll Management

Monthly payroll calculation

Attendance-based salary computation

Payroll summary generation

Downloadable Monthly Payroll Report (PDF)

Salary Formula:

Per Day Salary = Monthly Salary / 30

Net Salary = Per Day Salary × Days Present

📋 Task Management

(Admin / HR)

Assign tasks to employees

Track task progress

(Employee)

View assigned tasks

Update task status (Open / In Progress / Completed)

🛠 Tech Stack

Next.js (React – Pages Router)

JavaScript

Context API (Global State Management)

LocalStorage (Client-side persistence)

jsPDF (PDF generation)

Tailwind CSS

🏗 Architecture & Design

Modular component-based structure

Context API for shared application state

Clear separation of concerns

Frontend-focused architecture emphasizing logic and usability

This project is intentionally frontend-driven to highlight UI logic and state handling.

🔐 Authentication & Authorization

Authentication is role-based and simulated

No password storage or real authentication flow

UI-level access restrictions implemented per role

This approach keeps the system simple while demonstrating authorization logic.

📄 Payroll PDF Report

Generated payroll reports include:

Employee details

Attendance summary

Salary breakdown

Net payable amount

Reports are downloadable in PDF format.

🚀 Getting Started
1. Clone Repository
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system

2. Install Dependencies
npm install

3. Run Locally
npm run dev


Open in browser:

http://localhost:3000

📌 Limitations

Backend and database are not integrated

Authentication is simulated

Payroll logic is simplified

Designed as a functional prototype, not production HRMS

🔮 Future Enhancements

Backend integration (Node.js / MongoDB)

Secure authentication (JWT)

Real RFID/NFC hardware integration

Advanced payroll rules

Enhanced validations and UI/UX

👩‍💻 Developer

Tanu Kumari