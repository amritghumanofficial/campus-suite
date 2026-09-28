function AttendanceTable({
  students,
  classes,
  getStatus,
  handleToggleStatus,
  formatDate,
  attendanceDate,
}) {
  return (
    <div className="card border-0 shadow-sm">

      <div className="card-header bg-white py-3">

        <h5 className="h6 fw-bold text-secondary mb-1">
          Student Attendance Sheet
        </h5>

        <small className="text-muted">
          {formatDate(attendanceDate)}
        </small>

      </div>

      <div className="card-body p-0">

        {students.length === 0 ? (

          <div className="text-center py-5">

            <div className="fs-1 mb-2">
              👨‍🎓
            </div>

            <h6 className="fw-bold">
              No Students Found
            </h6>

            <p className="text-muted small mb-0">
              Add students or select another class.
            </p>

          </div>

        ) : (

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-light">
                <tr>

                  <th className="ps-3">
                    Roll No
                  </th>

                  <th>
                    Student
                  </th>

                  <th>
                    Class
                  </th>

                  <th>
                    Status
                  </th>

                  <th className="text-end pe-3">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {students.map((student) => {

                  const status =
                    getStatus(student.id);

                  const studentClass =
                    classes.find(
                      (cls) =>
                        cls.id === student.classId
                    );

                  return (
                    <tr key={student.id}>

                      <td className="ps-3 fw-semibold">
                        #{student.rollNo}
                      </td>

                      <td>
                        {student.name}
                      </td>

                      <td>
                        <span className="badge bg-secondary">
                          {studentClass?.name ||
                            student.course ||
                            "N/A"}
                        </span>
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            status === "Present"
                              ? "bg-success"
                              : status === "Absent"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {status}
                        </span>

                      </td>

                      <td className="text-end pe-3">

                        <button
                          type="button"
                          className={`btn btn-sm ${
                            status === "Present"
                              ? "btn-outline-danger"
                              : "btn-outline-success"
                          }`}
                          onClick={() =>
                            handleToggleStatus(
                              student.id
                            )
                          }
                        >
                          {status === "Present"
                            ? "Mark Absent"
                            : "Mark Present"}
                        </button>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default AttendanceTable;
