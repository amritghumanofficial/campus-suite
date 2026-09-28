function ClassTable({
  classes,
  getStudentCount,
  formatCurrency,
  onEdit,
  onDelete,
}) {
  return (
    <div className="card shadow-sm border-0">

      <div className="card-header bg-white py-3">

        <h5 className="h6 fw-bold mb-1">
          Class List
        </h5>

        <small className="text-muted">
          {classes.length} class
          {classes.length !== 1 ? "es" : ""} available
        </small>

      </div>

      <div className="card-body p-0">

        {classes.length === 0 ? (

          <div className="text-center py-5">

            <h6 className="fw-bold">
              No Classes Yet
            </h6>

            <p className="text-muted small mb-0">
              Click "Add Class" to create your first class.
            </p>

          </div>

        ) : (

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-light">

                <tr>
                  <th className="ps-3">Class</th>
                  <th>Teacher</th>
                  <th>Room</th>
                  <th>Students</th>
                  <th>Fees</th>
                  <th className="text-end pe-3">
                    Actions
                  </th>
                </tr>

              </thead>

              <tbody>

                {classes.map((cls) => {

                  const studentCount =
                    getStudentCount(cls.id);

                  const isFull =
                    cls.capacity > 0 &&
                    studentCount >= cls.capacity;

                  return (
                    <tr key={cls.id}>

                      <td className="ps-3">
                        <span className="fw-bold">
                          {cls.name}
                        </span>
                      </td>

                      <td>
                        {cls.teacher || (
                          <span className="text-muted">
                            Not assigned
                          </span>
                        )}
                      </td>

                      <td>
                        <span className="badge bg-secondary">
                          {cls.room || "N/A"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            isFull
                              ? "text-danger fw-bold"
                              : "fw-semibold"
                          }
                        >
                          {studentCount}
                        </span>

                        {cls.capacity > 0 && (
                          <span className="text-muted">
                            {" / "}
                            {cls.capacity}
                          </span>
                        )}
                      </td>

                      <td>
                        <span className="fw-semibold text-success">
                          {formatCurrency(cls.totalFees)}
                        </span>
                      </td>

                      <td className="text-end pe-3">

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => onEdit(cls)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onDelete(cls.id)}
                        >
                          Delete
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

export default ClassTable;
