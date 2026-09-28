function StudentStats({ students = [] }) {
  const totalStudents = students.length;

  const coursesCount = new Set(
    students
      .map((student) => student.course)
      .filter(Boolean)
  ).size;

  const maleCount = students.filter(
    (student) => student.gender?.toLowerCase() === "male"
  ).length;

  const femaleCount = students.filter(
    (student) => student.gender?.toLowerCase() === "female"
  ).length;

  return (
    <div className="row g-3 mb-4">

      {/* Total Students */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted small mb-1">
                  Total Students
                </p>

                <h3 className="fw-bold mb-0">
                  {totalStudents}
                </h3>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted small mb-1">
                  Active Courses
                </p>

                <h3 className="fw-bold mb-0 text-primary">
                  {coursesCount}
                </h3>
              </div>


            </div>
          </div>
        </div>
      </div>

      {/* Male */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted small mb-1">
                  Male Students
                </p>

                <h3 className="fw-bold mb-0 text-info">
                  {maleCount}
                </h3>
              </div>


            </div>
          </div>
        </div>
      </div>

      {/* Female */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted small mb-1">
                  Female Students
                </p>

                <h3 className="fw-bold mb-0 text-danger">
                  {femaleCount}
                </h3>
              </div>


            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default StudentStats;
