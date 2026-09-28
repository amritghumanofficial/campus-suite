import { useMemo, useState } from "react";

import AttendanceFilters from "../components/students/attendance/AttendanceFilters";
import AttendanceSummary from "../components/students/attendance/AttendanceSummary";
import AttendanceTable from "../components/students/attendance/AttendanceTable";

const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDate = (date) => {
  if (!date) return "";

  return new Date(
    `${date}T00:00:00`
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function AttendancePage({
  students = [],
  classes = [],
  attendance = {},
  setAttendance,
}) {
  const [attendanceDate, setAttendanceDate] =
    useState(getTodayDate());

  const [selectedClass, setSelectedClass] =
    useState("all");

  // Filter students
  const filteredStudents = useMemo(() => {
    if (selectedClass === "all") {
      return students;
    }

    return students.filter(
      (student) =>
        String(student.classId) ===
        String(selectedClass)
    );
  }, [students, selectedClass]);

  // Current date records
  const currentRecords =
    attendance[attendanceDate] || {};

  // Get status
  const getStatus = (studentId) => {
    return (
      currentRecords[studentId] ||
      "Not Marked"
    );
  };

  // Toggle status
  const handleToggleStatus = (studentId) => {
    setAttendance((previous) => {
      const dateRecords =
        previous[attendanceDate] || {};

      const currentStatus =
        dateRecords[studentId] ||
        "Not Marked";

      let nextStatus = "Present";

      if (currentStatus === "Present") {
        nextStatus = "Absent";
      }

      if (currentStatus === "Absent") {
        nextStatus = "Not Marked";
      }

      return {
        ...previous,

        [attendanceDate]: {
          ...dateRecords,
          [studentId]: nextStatus,
        },
      };
    });
  };

  // Mark all
  const markAll = (status) => {
    setAttendance((previous) => {
      const dateRecords =
        previous[attendanceDate] || {};

      const updatedRecords = {
        ...dateRecords,
      };

      filteredStudents.forEach((student) => {
        updatedRecords[student.id] = status;
      });

      return {
        ...previous,

        [attendanceDate]: updatedRecords,
      };
    });
  };

  // Reset
  const handleReset = () => {
    setAttendance((previous) => {
      const updated = {
        ...previous,
      };

      delete updated[attendanceDate];

      return updated;
    });
  };

  // Summary
  const totalStudents =
    filteredStudents.length;

  const presentCount =
    filteredStudents.filter(
      (student) =>
        getStatus(student.id) === "Present"
    ).length;

  const absentCount =
    filteredStudents.filter(
      (student) =>
        getStatus(student.id) === "Absent"
    ).length;

  const notMarkedCount =
    totalStudents -
    presentCount -
    absentCount;

  const percentage =
    totalStudents > 0
      ? Math.round(
          (presentCount / totalStudents) * 100
        )
      : 0;

  return (
    <div className="container-fluid py-2">

      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom">

        <div>
          <h2 className="h4 fw-bold text-dark mb-1">
             Attendance
          </h2>

          <p className="text-muted small mb-0">
            Manage daily student attendance
          </p>
        </div>

      </div>

      {/* Filters */}
      <AttendanceFilters
        attendanceDate={attendanceDate}
        setAttendanceDate={setAttendanceDate}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        classes={classes}
        totalStudents={totalStudents}
        markAll={markAll}
        handleReset={handleReset}
        hasAttendance={
          Boolean(attendance[attendanceDate])
        }
      />

      {/* Summary */}
      <AttendanceSummary
        totalStudents={totalStudents}
        presentCount={presentCount}
        absentCount={absentCount}
        notMarkedCount={notMarkedCount}
        percentage={percentage}
      />

      {/* Table */}
      <AttendanceTable
        students={filteredStudents}
        classes={classes}
        getStatus={getStatus}
        handleToggleStatus={handleToggleStatus}
        formatDate={formatDate}
        attendanceDate={attendanceDate}
      />

    </div>
  );
}

export default AttendancePage;
