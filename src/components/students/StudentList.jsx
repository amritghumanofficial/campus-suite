function StudentList({
  students = [],
  classes = [],
  onEdit,
  onDelete,
  onViewDetails,
}) {
  const getClassName = (classId) => {
    const foundClass = classes.find(
      (cls) => cls.id === classId
    );

    return (
      foundClass?.name || "Not Assigned"
    );
  };

  if (students.length === 0) {
    return (
      <div className="text-center py-5">

        <div className="fs-1 mb-2">
          👨‍🎓
        </div>

        <h6 className="fw-bold">
          No Students Found
        </h6>

        <p className="text-muted small mb-0">
          No student records match your
          search.
        </p>

      </div>
    );
  }

  return (
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
              Contact
            </th>

            <th className="text-end pe-3">
              Actions
            </th>

          </tr>
        </thead>

        <tbody>

          {students.map((student) => (
            <tr key={student.id}>

              <td className="ps-3 fw-semibold">
                #{student.rollNo}
              </td>

              <td>
                <div className="fw-bold">
                  {student.name}
                </div>

                <small className="text-muted">
                  {student.email ||
                    "No email"}
                </small>
              </td>

              <td>
                {getClassName(
                  student.classId
                )}
              </td>

              <td>
                {student.phone ||
                  "N/A"}
              </td>

              <td className="text-end pe-3">

                {onViewDetails && (
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() =>
                      onViewDetails(
                        student
                      )
                    }
                  >
                    View
                  </button>
                )}

                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() =>
                    onEdit(student)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() =>
                    onDelete(
                      student.id
                    )
                  }
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default StudentList;
