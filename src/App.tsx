import { useEffect, useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { AdminDashboard } from "./components/AdminDashboard";
import { FacultyDashboard } from "./components/FacultyDashboard";
import { RegistrarDashboard } from "./components/RegistrarDashboard";
import { ProfilePage } from "./components/ProfilePage";
import { SettingsPage } from "./components/SettingsPage";
import { EnrollmentApproval } from "./components/EnrollmentApproval";
import { GradeInput } from "./components/GradeInput";
import { CurriculumEditor } from "./components/CurriculumEditor";

export type UserRole = "admin" | "faculty" | "registrar" | null;

export interface User {
  name: string;
  email: string;
  role: UserRole;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<string>("dashboard");

  // Load existing session on refresh
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // Called by LoginScreen when login is successful
  const handleLoginSuccess = (data: any) => {
    const userData: User = {
      name: data.name ?? data.email.split("@")[0],
      email: data.email,
      role: data.role as UserRole,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setCurrentPage("dashboard");
  };

  // If not logged in → show LoginScreen
  if (!user) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // Dashboard based on role
  const renderDashboard = () => {
    switch (user.role) {
      case "admin":
        return (
          <AdminDashboard
            user={user}
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
          />
        );
      case "faculty":
        return (
          <FacultyDashboard
            user={user}
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
          />
        );
      case "registrar":
        return (
          <RegistrarDashboard
            user={user}
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
          />
        );
      default:
        return null;
    }
  };

  // Shared pages
  if (currentPage === "profile") {
    return <ProfilePage user={user} onNavigate={setCurrentPage} onLogout={handleLogout} />;
  }

  if (currentPage === "settings") {
    return <SettingsPage user={user} onNavigate={setCurrentPage} onLogout={handleLogout} />;
  }

  if (currentPage === "enrollment-approval" && (user.role === "admin" || user.role === "registrar")) {
    return (
      <EnrollmentApproval
        user={user}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />
    );
  }

  if (currentPage === "grade-input" && (user.role === "admin" || user.role === "faculty")) {
    return <GradeInput user={user} onNavigate={setCurrentPage} onLogout={handleLogout} />;
  }

  if (currentPage === "curriculum-editor" && user.role === "admin") {
    return <CurriculumEditor user={user} onNavigate={setCurrentPage} onLogout={handleLogout} />;
  }

  return renderDashboard();
}

export default App;
