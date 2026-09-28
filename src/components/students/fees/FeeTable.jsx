function FeeTable({ students, onCollectFee }) {
  return (
    <div className="card border-0 shadow-sm">

      <div className="card-header bg-white py-3">
        <h5 className="mb-0 fw-bold">
          Student Fee Records
        </h5>
      </div>

      <div className="card-body p-0">

        {students.length === 0 ? (

          <div className="text-center py-5 text-muted">

            <h6>
              No Students Found
            </h6>

            <p className="small mb-0">
              Add students first to manage fees.
            </p>

          </div>

        ) : (

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-light">
                <tr>
                  <th>Roll No</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Total Fees</th>
                  <th>Paid</th>
                  <th>Pending</th>
                  <th>Status</th>
                  <th className="text-end">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {students.map((student) => {

                  const total =
                    Number(student.totalFees) || 0;

                  const paid =
                    Number(student.paidFees) || 0;

                  const pending =
                    Math.max(total - paid, 0);

                  const isPaid =
                    total > 0 && pending === 0;

                  return (
                    <tr key={student.id}>

                      <td className="fw-semibold">
                        #{student.rollNo}
                      </td>

                      <td className="fw-bold">
                        {student.name}
                      </td>

                      <td>
                        {student.course || "N/A"}
                      </td>

                      <td>
                        ₹{total.toLocaleString("en-IN")}
                      </td>

                      <td className="text-success fw-semibold">
                        ₹{paid.toLocaleString("en-IN")}
                      </td>

                      <td className="text-danger fw-semibold">
                        ₹{pending.toLocaleString("en-IN")}
                      </td>

                      <td>

                        {total === 0 ? (
                          <span className="badge bg-secondary">
                            Fee Not Set
                          </span>
                        ) : isPaid ? (
                          <span className="badge bg-success">
                            Paid
                          </span>
                        ) : (
                          <span className="badge bg-warning text-dark">
                            Pending
                          </span>
                        )}

                      </td>

                      <td className="text-end">

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            onCollectFee(student.id)
                          }
                          disabled={
                            total === 0 || pending === 0
                          }
                        >
                          {isPaid
                            ? "Fully Paid"
                            : "Collect Fee"}
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

export default FeeTable;
