function AttendanceSummary({
  totalStudents,
  presentCount,
  absentCount,
  notMarkedCount,
  percentage,
}) {
  return (
    <>
      <div className="row g-3 mb-4">

        {/* Total */}
        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <small className="text-muted fw-semibold">
                Total Students
              </small>

              <h3 className="fw-bold mt-2 mb-0">
                {totalStudents}
              </h3>
            </div>
          </div>
        </div>

        {/* Present */}
        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <small className="text-success fw-semibold">
                Present
              </small>

              <h3 className="fw-bold text-success mt-2 mb-0">
                {presentCount}
              </h3>
            </div>
          </div>
        </div>

        {/* Absent */}
        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <small className="text-danger fw-semibold">
                Absent
              </small>

              <h3 className="fw-bold text-danger mt-2 mb-0">
                {absentCount}
              </h3>
            </div>
          </div>
        </div>

        {/* Not Marked */}
        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <small className="text-warning fw-semibold">
                Not Marked
              </small>

              <h3 className="fw-bold text-warning mt-2 mb-0">
                {notMarkedCount}
              </h3>
            </div>
          </div>
        </div>

      </div>

      {/* Percentage */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">

          <div className="d-flex justify-content-between mb-2">
            <span className="small fw-semibold">
              Attendance Percentage
            </span>

            <span className="fw-bold text-primary">
              {percentage}%
            </span>
          </div>

          <div className="progress">
            <div
              className="progress-bar bg-success"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>

        </div>
      </div>
    </>
  );
}

export default AttendanceSummary;
