import { useCallback, useEffect, useState } from "react";

// Authentication
import {
  getCurrentUser,
  isUserLoggedIn,
  logoutUser,
} from "./data/authService";

// Data
import { initialStudents } from "./data/initialStudents";
import { initialClasses } from "./data/initialClasses";

// Storage
import { loadData, saveData } from "./services/storageService";

// Layout
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

// UI
import Toast from "./components/ui/Toast";

// Pages
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentsPage";
import AddStudentPage from "./pages/AddStudentPage";
import StudentDetailsPage from "./pages/StudentDetailsPage";
import AttendancePage from "./pages/AttendancePage";
import ClassesPage from "./pages/ClassesPage";
import FeesPage from "./pages/FeesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Legal
import PrivacyPolicyPage from "./pages/legal/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/legal/TermsOfServicePage";
import SupportPage from "./pages/legal/SupportPage";

function App() {
  // ==========================================
  // AUTHENTICATION
  // ==========================================

  const [isAuthenticated, setIsAuthenticated] =
    useState(isUserLoggedIn);

  const [currentUser, setCurrentUser] =
    useState(getCurrentUser);

  const [authPage, setAuthPage] =
    useState("login");

  // ==========================================
  // MAIN APPLICATION DATA
  // ==========================================

  const [students, setStudents] = useState(() =>
    loadData("students", initialStudents)
  );

  const [classes, setClasses] = useState(() =>
    loadData("classes", initialClasses)
  );

  const [attendance, setAttendance] = useState(() =>
    loadData("attendance", {})
  );

  const [fees, setFees] = useState(() =>
    loadData("fees", {})
  );

  // ==========================================
  // NAVIGATION
  // ==========================================

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [editingStudent, setEditingStudent] =
    useState(null);

  // ==========================================
  // TOAST
  // ==========================================

  const [toastMessage, setToastMessage] =
    useState("");

  const showToast = useCallback((message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  }, []);

  // ==========================================
  // SAVE DATA
  // ==========================================

  useEffect(() => {
    saveData("students", students);
  }, [students]);

  useEffect(() => {
    saveData("classes", classes);
  }, [classes]);

  useEffect(() => {
    saveData("attendance", attendance);
  }, [attendance]);

  useEffect(() => {
    saveData("fees", fees);
  }, [fees]);

  // ==========================================
  // AUTH HANDLERS
  // ==========================================

  const handleLogin = (user) => {
    const userName =
      typeof user === "object"
        ? user.fullName
        : user;

    setIsAuthenticated(true);
    setCurrentUser(userName || "Admin");

    showToast(
      `Welcome back, ${userName || "Admin"}! `
    );
  };

  const handleRegister = (user) => {
    const userName =
      typeof user === "object"
        ? user.fullName
        : user;

    setIsAuthenticated(true);
    setCurrentUser(userName || "Admin");

    showToast(
      `Welcome ${userName || "Admin"}! Account created successfully. `
    );
  };

  const handleLogout = () => {
    logoutUser();

    setIsAuthenticated(false);
    setCurrentUser("Admin");

    setSelectedStudent(null);
    setEditingStudent(null);
    setActiveTab("dashboard");

    showToast("Logged out successfully!");
  };

  // ==========================================
  // STUDENT HANDLERS
  // ==========================================

  const handleSaveStudent = (studentData) => {
    if (editingStudent) {
      setStudents((previousStudents) =>
        previousStudents.map((student) =>
          student.id === editingStudent.id
            ? {
                ...studentData,
                id: editingStudent.id,
              }
            : student
        )
      );

      // Keep selected student updated
      if (
        selectedStudent?.id ===
        editingStudent.id
      ) {
        setSelectedStudent({
          ...studentData,
          id: editingStudent.id,
        });
      }

      showToast(
        "Student updated successfully!"
      );
    } else {
      const newStudent = {
        ...studentData,
        id: Date.now(),
      };

      setStudents((previousStudents) => [
        newStudent,
        ...previousStudents,
      ]);

      showToast(
        "Student added successfully!"
      );
    }

    setEditingStudent(null);
    setActiveTab("students");
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setActiveTab("add-student");
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setActiveTab("student-details");
  };

  const handleDelete = (studentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    // Remove student
    setStudents((previousStudents) =>
      previousStudents.filter(
        (student) => student.id !== studentId
      )
    );

    // Remove student's attendance records
    setAttendance((previousAttendance) => {
      const updatedAttendance = {};

      Object.entries(previousAttendance).forEach(
        ([date, records]) => {
          const updatedRecords = {
            ...records,
          };

          delete updatedRecords[studentId];

          updatedAttendance[date] =
            updatedRecords;
        }
      );

      return updatedAttendance;
    });

    // Remove student's fee record
    setFees((previousFees) => {
      const updatedFees = {
        ...previousFees,
      };

      delete updatedFees[studentId];

      return updatedFees;
    });

    if (selectedStudent?.id === studentId) {
      setSelectedStudent(null);
      setActiveTab("students");
    }

    showToast(
      "Student deleted successfully!"
    );
  };

  const handleOpenAddStudent = () => {
    setEditingStudent(null);
    setActiveTab("add-student");
  };

  // ==========================================
  // AUTH SCREEN
  // ==========================================

  if (!isAuthenticated) {
    return (
      <div className="bg-light min-vh-100 d-flex flex-column justify-content-center">

        <Toast message={toastMessage} />

        {authPage === "login" ? (
          <LoginPage
            onLogin={handleLogin}
            onSwitchToRegister={() =>
              setAuthPage("register")
            }
          />
        ) : (
          <RegisterPage
            onRegister={handleRegister}
            onSwitchToLogin={() =>
              setAuthPage("login")
            }
          />
        )}

      </div>
    );
  }

  // ==========================================
  // MAIN APPLICATION
  // ==========================================

  return (
    <div className="app-layout d-flex flex-column min-vh-100 bg-light">

      <Navbar
        user={currentUser}
        onLogout={handleLogout}
      />

      <Toast message={toastMessage} />

      <div className="main-wrapper d-flex flex-grow-1">

        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
        />

        <main className="content-area flex-grow-1 p-3 p-md-4">

          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <DashboardPage
              students={students}
              classes={classes}
              attendance={attendance}
              fees={fees}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewDetails={handleViewDetails}
              onOpenAddModal={
                handleOpenAddStudent
              }
            />
          )}

          {/* STUDENTS */}
          {activeTab === "students" && (
            <StudentsPage
              students={students}
              classes={classes}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewDetails={handleViewDetails}
              onOpenAddModal={
                handleOpenAddStudent
              }
            />
          )}

          {/* ADD / EDIT STUDENT */}
          {activeTab === "add-student" && (
            <AddStudentPage
              onAddStudent={
                handleSaveStudent
              }
              editingStudent={
                editingStudent
              }
              classes={classes}
              onCancel={() => {
                setEditingStudent(null);
                setActiveTab("students");
              }}
            />
          )}

          {/* STUDENT DETAILS */}
          {activeTab === "student-details" && (
            <StudentDetailsPage
              student={selectedStudent}
              classes={classes}
              onBack={() =>
                setActiveTab("students")
              }
              onEdit={handleEdit}
            />
          )}

          {/* ATTENDANCE */}
          {activeTab === "attendance" && (
            <AttendancePage
              students={students}
              classes={classes}
              attendance={attendance}
              setAttendance={setAttendance}
            />
          )}

          {/* CLASSES */}
          {activeTab === "classes" && (
            <ClassesPage
              students={students}
              classes={classes}
              setClasses={setClasses}
              setStudents={setStudents}
            />
          )}

          {/* FEES */}
          {activeTab === "fees" && (
            <FeesPage
              students={students}
              fees={fees}
              setFees={setFees}
            />
          )}

          {/* LEGAL */}
          {activeTab === "privacy" && (
            <PrivacyPolicyPage
              onBack={() =>
                setActiveTab("dashboard")
              }
            />
          )}

          {activeTab === "terms" && (
            <TermsOfServicePage
              onBack={() =>
                setActiveTab("dashboard")
              }
            />
          )}

          {activeTab === "support" && (
            <SupportPage
              onBack={() =>
                setActiveTab("dashboard")
              }
            />
          )}

        </main>
      </div>

      <Footer
        onNavigate={(tab) =>
          setActiveTab(tab)
        }
      />

    </div>
  );
}

export default App;