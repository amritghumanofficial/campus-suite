import { useState } from "react";
import StudentSearch from "../components/students/StudentSearch";
import StudentList from "../components/students/StudentList";

function StudentsPage({
  students = [],
  classes = [],
  onEdit,
  onDelete,
  onViewDetails,
  onOpenAddModal,
}) {
  const [search, setSearch] =
    useState("");

  const filteredStudents =
    students.filter((student) => {
      const query =
        search.toLowerCase().trim();

      return (
        student.name
          ?.toLowerCase()
          .includes(query) ||
        String(student.rollNo)
          .toLowerCase()
          .includes(query) ||
        student.course
          ?.toLowerCase()
          .includes(query)
      );
    });

  return (
    <div className="container-fluid py-2">

      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom">

        <div>
          <h2 className="h4 fw-bold text-dark mb-1">
             Students
          </h2>

          <p className="text-muted small mb-0">
            View and manage all registered
            students
          </p>
        </div>

        <button
          className="btn btn-primary mt-2 mt-md-0"
          onClick={onOpenAddModal}
        >
          Add Student
        </button>

      </div>

      {/* Search */}
      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body">

          <StudentSearch
            search={search}
            setSearch={setSearch}
          />

        </div>
      </div>

      {/* List */}
      <div className="card border-0 shadow-sm">

        <div className="card-header bg-white py-3">

          <h5 className="h6 fw-bold text-secondary mb-1">
            Student Records
          </h5>

          <small className="text-muted">
            {filteredStudents.length} student
            {filteredStudents.length !== 1
              ? "s"
              : ""}{" "}
            found
          </small>

        </div>

        <div className="card-body p-0">

          <StudentList
            students={filteredStudents}
            classes={classes}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewDetails={
              onViewDetails
            }
          />

        </div>

      </div>

    </div>
  );
}

export default StudentsPage;
 