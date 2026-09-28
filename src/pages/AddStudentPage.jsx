import StudentForm from "../components/students/StudentForm";
import Button from "../components/ui/Button";

function AddStudentPage({
  onAddStudent,
  onCancel,
  editingStudent,
  classes = [],
}) {
  const isEditing = Boolean(editingStudent);

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1>
            {isEditing
              ? "Edit Student"
              : "Add New Student"}
          </h1>

          <p className="text-muted mb-0">
            {isEditing
              ? "Update student information"
              : "Create a new student record"}
          </p>
        </div>

        <Button variant="secondary" onClick={onCancel}>
          Back to Students
        </Button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <StudentForm
            onSave={onAddStudent}
            onCancel={onCancel}
            editingStudent={editingStudent}
            classes={classes}
            submitLabel={
              isEditing
                ? "Update Student"
                : "Create Student Record"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default AddStudentPage;
