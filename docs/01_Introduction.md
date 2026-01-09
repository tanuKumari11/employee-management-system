# 1. Introduction

## 1.1 Document Purpose
This document serves as the primary reference guide for the **Employee Management System (EMS)**. It outlines the project's scope, functional requirements, and intended audience, providing a foundational understanding for developers, stakeholders, and evaluators.

## 1.2 Product Overview
The Employee Management System is a designed to digitize core HR administrative tasks. It replaces manual spreadsheet-based tracking with an interactive, role-based digital interface. 

The system focuses on simplicity and speed, utilizing local browser storage to demonstrate state management capabilities without the overhead of a backend infrastructure.

## 1.3 Key Functional Requirements
### 1.3.1 Role-Based Access Control (RBAC)
- **Admin**: Complete system oversight. Can manage employees, assigning tasks, and generate payroll.
- **HR**: Similar privileges to Admin, focused on personnel management.
- **Employee**: Limited access. Can only view their own tasks, mark attendance via NFC simulation, and view their payslips.

### 1.3.2 Module Breakdown
| Module | Description | Access |
|:---|:---|:---|
| **Employee Directory** | CRUD operations for employee records. | Admin/HR |
| **Smart Attendance** | Real-time check-in/out simulation using "NFC IDs". | Employee |
| **Task Board** | Designating and tracking work items. | All Roles |
| **Payroll Engine** | Automated salary calculation based on attendance days. | Admin/HR |

## 1.4 Business Rules & Constraints
1.  **Attendance**: An employee can only check in once per calendar day.
2.  **Payroll**: Salary is mis-calculated as `(Base Salary / 30) * Days Present`.
3.  **Data Persistence**: All data is stored in the browser's `localStorage`. Clearing browser cache will reset the system.
4.  **Security**: Authentication is simulated. No real password encryption is implemented (MVP scope).

## 1.5 Glossary
- **MVP**: Minimum Viable Product.
- **NFC**: Near Field Communication (Simulated here via text input).
- **SPA**: Single Page Application.
- **Context API**: React's native state management system.
