function FeeStudentSelect({
  students,
  selectedStudentId,
  setSelectedStudentId,
}) {
  return (
    <div className="card border-0 shadow-sm mb-4">

      <div className="card-body">

        <div className="row align-items-end g-3">

          <div className="col-md-8">

            <label className="form-label fw-semibold">
              Select Student
            </label>

            <select
              className="form-select"
              value={selectedStudentId}
              onChange={(e) =>
                setSelectedStudentId(e.target.value)
              }
            >
              <option value="">
                Select Student
              </option>

              {students.map((student) => {
                const total =
                  Number(student.totalFees) || 0;

                const paid =
                  Number(student.paidFees) || 0;

                const pending =
                  Math.max(total - paid, 0);

                return (
                  <option
                    key={student.id}
                    value={student.id}
                  >
                    {student.name} - Roll #{student.rollNo}
                    {" | Pending ₹"}
                    {pending.toLocaleString("en-IN")}
                  </option>
                );
              })}
            </select>

          </div>

          <div className="col-md-4">

            <div className="text-muted small">
              Select a student to collect fee.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FeeStudentSelect;
