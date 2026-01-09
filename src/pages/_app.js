import "@/styles/globals.css";
import { EmployeeProvider } from "../context/EmployeeContext";
import { AuthProvider } from "../context/AuthContext";
import { AttendanceProvider } from "../context/AttendanceContext";
import { TaskProvider } from "../context/TaskContext";
import { AlertProvider } from "../context/AlertContext";
import { ConfirmProvider } from "../context/ConfirmContext";
import Footer from "../components/footer";

export default function App({ Component, pageProps }) {
  return (
    <AlertProvider>
      <ConfirmProvider>
        <EmployeeProvider>
          <AuthProvider>
            <AttendanceProvider>
              <TaskProvider>
                <Component {...pageProps} />
                <Footer />
              </TaskProvider>
            </AttendanceProvider>
          </AuthProvider>
        </EmployeeProvider>
      </ConfirmProvider>
    </AlertProvider>
  );
}

