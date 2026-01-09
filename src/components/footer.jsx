export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "12px",
        fontSize: "14px",
        marginTop: "40px",
        borderTop: "1px solid #e5e7eb",
        color: "#555",
      }}
    >
      © {new Date().getFullYear()} Employee Management System | Developed by Tanu Kumari
    </footer>
  );
}
