function AttendanceFilters({
  attendanceDate,
  setAttendanceDate,
  selectedClass,
  setSelectedClass,
  classes,
  totalStudents,
  markAll,
  handleReset,
  hasAttendance,
}) {
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">

        <div className="row g-3 align-items-end">

          {/* Class Filter */}
          <div className="col-md-5">

            <label className="form-label small fw-semibold">
              Filter by Class
            </label>

            <select
              className="form-select"
              value={selectedClass}
              onChange={(e) =>
                setSelectedClass(e.target.value)
              }
            >
              <option value="all">
                All Classes
              </option>

              {classes.map((cls) => (
                <option
                  key={cls.id}
                  value={cls.id}
                >
                  {cls.name}
                </option>
              ))}
            </select>

          </div>

          {/* Date */}
          <div className="col-md-3">

            <label
              htmlFor="attendance-date"
              className="form-label small fw-semibold"
            >
              Date
            </label>

            <input
              id="attendance-date"
              type="date"
              className="form-control"
              value={attendanceDate}
              onChange={(e) =>
                setAttendanceDate(e.target.value)
              }
            />

          </div>

          {/* Buttons */}
          <div className="col-md-4">

            <div className="d-flex flex-wrap gap-2">

              <button
                type="button"
                className="btn btn-sm btn-outline-success"
                onClick={() => markAll("Present")}
                disabled={totalStudents === 0}
              >
                 All Present
              </button>

              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => markAll("Absent")}
                disabled={totalStudents === 0}
              >
                 All Absent
              </button>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleReset}
                disabled={!hasAttendance}
              >
                 Reset
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AttendanceFilters;
