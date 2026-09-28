import StudentList from "../components/students/StudentList";

function DashboardPage({
  students = [],
  classes = [],
  attendance = {},
  fees = {},
  onEdit,
  onDelete,
  onViewDetails,
  onOpenAddModal,
}) {
  const today = new Date();

  const year =
    today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  const todayKey =
    `${year}-${month}-${day}`;

  const todayAttendance =
    attendance[todayKey] || {};

  const presentToday =
    students.filter(
      (student) =>
        todayAttendance[
          student.id
        ] === "Present"
    ).length;

  const absentToday =
    students.filter(
      (student) =>
        todayAttendance[
          student.id
        ] === "Absent"
    ).length;

  const totalCollected =
    students.reduce((total, student) => {
      const fee =
        fees[student.id];

      return (
        total +
        Number(
          fee?.paidAmount || 0
        )
      );
    }, 0);

  return (
    <div className="container-fluid py-2">

      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom">

        <div>
          <h2 className="h4 fw-bold text-dark mb-1">
             Dashboard
          </h2>

          <p className="text-muted small mb-0">
            Overview of your Campus Suite data
          </p>
        </div>

        <button
          className="btn btn-primary mt-2 mt-md-0"
          onClick={onOpenAddModal}
        >
           Add Student
        </button>

      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">

              <small className="text-muted fw-semibold">
                Total Students
              </small>

              <h3 className="fw-bold mt-2 mb-0">
                {students.length}
              </h3>

            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">

              <small className="text-muted fw-semibold">
                Total Classes
              </small>

              <h3 className="fw-bold text-primary mt-2 mb-0">
                {classes.length}
              </h3>

            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">

              <small className="text-success fw-semibold">
                Present Today
              </small>

              <h3 className="fw-bold text-success mt-2 mb-0">
                {presentToday}
              </h3>

            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">

              <small className="text-info fw-semibold">
                Fees Collected
              </small>

              <h5 className="fw-bold text-info mt-2 mb-0">
                ₹
                {totalCollected.toLocaleString(
                  "en-IN"
                )}
              </h5>

            </div>
          </div>
        </div>

      </div>

      {/* Today's Attendance */}
      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center">

            <div>
              <h5 className="h6 fw-bold text-secondary mb-1">
                Today's Attendance
              </h5>

              <small className="text-muted">
                {todayKey}
              </small>
            </div>

            <div className="d-flex gap-3">

              <span className="text-success small fw-semibold">
                Present: {presentToday}
              </span>

              <span className="text-danger small fw-semibold">
                Absent: {absentToday}
              </span>

            </div>

          </div>

        </div>
      </div>

      {/* Students */}
      <div className="card border-0 shadow-sm">

        <div className="card-header bg-white py-3">

          <h5 className="h6 fw-bold text-secondary mb-1">
            Recent Students
          </h5>

          <small className="text-muted">
            Latest registered students
          </small>

        </div>

        <div className="card-body p-0">

          <StudentList
            students={students.slice(0, 5)}
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

export default DashboardPage;
