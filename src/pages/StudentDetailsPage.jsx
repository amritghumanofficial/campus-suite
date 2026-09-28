function StudentDetailsPage({
  student,
  classes = [],
  onBack,
  onEdit,
}) {
  if (!student) {
    return (
      <div className="container-fluid py-2">

        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">

            <div className="fs-1 mb-2">
              👤
            </div>

            <h6 className="fw-bold">
              No Student Selected
            </h6>

            <button
              className="btn btn-outline-secondary"
              onClick={onBack}
            >
               Back to Students
            </button>

          </div>
        </div>

      </div>
    );
  }

  const initial =
    student.name
      ?.charAt(0)
      .toUpperCase() || "S";

  const studentClass =
    classes.find(
      (cls) =>
        cls.id === student.classId
    );

  return (
    <div className="container-fluid py-2">

      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom">

        <div>
          <h2 className="h4 fw-bold text-dark mb-1">
            👤 Student Details
          </h2>

          <p className="text-muted small mb-0">
            Complete student profile
          </p>
        </div>

        <div className="d-flex gap-2 mt-2 mt-md-0">

          <button
            className="btn btn-primary"
            onClick={() =>
              onEdit(student)
            }
          >
            ✏️ Edit
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={onBack}
          >
             Back
          </button>

        </div>

      </div>

      {/* Profile */}
      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body p-4">

          <div className="d-flex align-items-center gap-3">

            <div
              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
              style={{
                width: "70px",
                height: "70px",
                fontSize: "28px",
              }}
            >
              {initial}
            </div>

            <div>

              <h3 className="h5 fw-bold mb-1">
                {student.name}
              </h3>

              <p className="text-muted small mb-1">
                Roll No:{" "}
                <strong>
                  {student.rollNo}
                </strong>
              </p>

              <p className="text-muted small mb-0">
                Class:{" "}
                <strong>
                  {studentClass?.name ||
                    "Not Assigned"}
                </strong>
              </p>

            </div>

          </div>
        </div>
      </div>

      {/* Information */}
      <div className="row g-3">

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">

              <small className="text-muted fw-semibold">
                Email Address
              </small>

              <h6 className="fw-bold mt-2 mb-0">
                {student.email ||
                  "N/A"}
              </h6>

            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">

              <small className="text-muted fw-semibold">
                Contact Phone
              </small>

              <h6 className="fw-bold mt-2 mb-0">
                {student.phone ||
                  "N/A"}
              </h6>

            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">

              <small className="text-muted fw-semibold">
                Admission Date
              </small>

              <h6 className="fw-bold mt-2 mb-0">
                {student.joiningDate ||
                  "N/A"}
              </h6>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default StudentDetailsPage;
