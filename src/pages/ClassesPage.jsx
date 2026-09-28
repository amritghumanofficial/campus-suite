import { useState } from "react";

import ClassSummary from "../components/students/classes/ClassSummary";
import ClassForm from "../components/students/classes/ClassForm";
import ClassTable from "../components/students/classes/ClassTable";

const emptyForm = {
  name: "",
  teacher: "",
  room: "",
  capacity: "",
  totalFees: "",
};

function ClassesPage({
  students = [],
  classes = [],
  setClasses,
  setStudents,
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Reset
  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  // Add / Update
  const handleSubmit = (e) => {
    e.preventDefault();

    const className = formData.name.trim();

    if (!className) {
      return;
    }

    const totalFees = Number(formData.totalFees) || 0;
    const capacity = Number(formData.capacity) || 0;

    if (editingId) {
      setClasses((previous) =>
        previous.map((cls) =>
          cls.id === editingId
            ? {
                ...cls,
                name: className,
                teacher: formData.teacher.trim(),
                room: formData.room.trim(),
                capacity,
                totalFees,
              }
            : cls
        )
      );
    } else {
      const newClass = {
        id: Date.now(),
        name: className,
        teacher: formData.teacher.trim(),
        room: formData.room.trim(),
        capacity,
        totalFees,
      };

      setClasses((previous) => [
        ...previous,
        newClass,
      ]);
    }

    resetForm();
  };

  // Edit
  const handleEdit = (cls) => {
    setEditingId(cls.id);

    setFormData({
      name: cls.name || "",
      teacher: cls.teacher || "",
      room: cls.room || "",
      capacity: cls.capacity || "",
      totalFees: cls.totalFees || "",
    });

    document
      .getElementById("class-form")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  // Delete
  const handleDelete = (classId) => {
    const assignedStudents = students.filter(
      (student) => student.classId === classId
    );

    let message =
      "Are you sure you want to delete this class?";

    if (assignedStudents.length > 0) {
      message =
        `This class has ${assignedStudents.length} assigned student(s).\n\n` +
        `Deleting the class will make these students unassigned.\n\n` +
        `Do you want to continue?`;
    }

    if (!window.confirm(message)) {
      return;
    }

    setClasses((previous) =>
      previous.filter(
        (cls) => cls.id !== classId
      )
    );

    if (assignedStudents.length > 0) {
      setStudents((previous) =>
        previous.map((student) =>
          student.classId === classId
            ? {
                ...student,
                classId: null,
              }
            : student
        )
      );
    }

    if (editingId === classId) {
      resetForm();
    }
  };

  // Student count
  const getStudentCount = (classId) => {
    return students.filter(
      (student) => student.classId === classId
    ).length;
  };

  // Currency
  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  // Total fees
  const totalClassFees = classes.reduce(
    (total, cls) =>
      total + (Number(cls.totalFees) || 0),
    0
  );

  return (
    <div className="container-fluid py-3">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">

        <div>
          <h2 className="h4 fw-bold mb-1">
             Classes & Courses
          </h2>

          <p className="text-muted small mb-0">
            Manage your classes and courses
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            resetForm();

            document
              .getElementById("class-form")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }}
        >
          + Add Class
        </button>

      </div>


      {/* Summary */}

      <ClassSummary
        totalClasses={classes.length}
        totalStudents={students.length}
        totalFees={totalClassFees}
        formatCurrency={formatCurrency}
      />


      {/* Form */}

      <ClassForm
        formData={formData}
        editingId={editingId}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      />


      {/* Table */}

      <ClassTable
        classes={classes}
        getStudentCount={getStudentCount}
        formatCurrency={formatCurrency}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </div>
  );
}

export default ClassesPage;
