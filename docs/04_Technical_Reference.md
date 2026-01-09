# 4. Technical Reference

## 4.1 Component API Documentation

### `EmployeeForm`
**Location**: `src/components/employees/EmployeeForm.js`
**Purpose**: Handles creation of new employee records.

| Prop | Type | Description |
|:---|:---|:---|
| `onAdd` | `Function` | Callback triggered when the form is successfully submitted. |

### `TaskList`
**Location**: `src/components/tasks/TaskList.js`
**Purpose**: Displays a filtered list of tasks and handles status updates.

| Prop | Type | Description |
|:---|:---|:---|
| `tasks` | `Array` | List of task objects to display. |
| `employees` | `Array` | List of employees (used to resolve `assignedTo` names). |
| `currentUser` | `Object` | The currently logged-in user context. |
| `onUpdateStatus` | `Function` | Callback `(taskId, newStatus)` for filtering. |

### `AttendanceTable`
**Location**: `src/components/attendance/AttendanceTable.js`
**Purpose**: Visualizes attendance history with sorting and filtering.

| Prop | Type | Description |
|:---|:---|:---|
| `attendance` | `Array` | List of attendance objects (`{date, checkIn, ...}`). |

## 4.2 Utility Functions

### `pdfGenerator.js`
- **Function**: `generatePaySlip(payrollItem)`
- **Description**: Uses `jspdf` to render a canvas-based PDF document.
- **Parameters**:
    - `payrollItem`: Object containing salary breakdown, employee details, and attendance summary.

### `salaryCalculator.js`
- **Function**: `calculateSalary(base, daysPresent)`
- **Logic**: `(Base Salary / 30) * Days Present`.
- **Returns**: Formatted currency string or raw number.

## 4.3 Development Guidelines

### Tailwind CSS Conventions
- **Spacing**: Use standard grid system (`p-4`, `m-2`, `gap-4`).
- **Responsiveness**: Mobile-first approach. Default styles are mobile; add `md:` or `lg:` for desktop overrides.
- **Colors**: Use `slate` or `gray` for neutrals, `blue` for primary actions, `green` for success states.

### Code Quality Check
Before committing, ensure:
1.  No console logs (`console.log`) in production code.
2.  All new components are responsive.
3.  Context providers are properly nested in `_app.js`.

## 4.4 Deployment
1.  **Build**: `npm run build` (Creates `.next` production folder).
2.  **Start**: `npm start` (Runs the production server).
3.  **Host**: Deployable to any Node.js compatible host (Vercel, Netlify, AWS EC2).
