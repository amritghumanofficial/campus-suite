// src\components\students\classes\ClassSummary.jsx

function ClassSummary({
  totalClasses,
  totalStudents,
  totalFees,
  formatCurrency,
}) {
  return (
    <div className="row g-3 mb-4">

      <div className="col-12 col-md-4">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <p className="text-muted small fw-semibold mb-1">
              Classes
            </p>

            <h3 className="fw-bold text-primary mb-0">
              {totalClasses}
            </h3>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <p className="text-muted small fw-semibold mb-1">
              Students
            </p>

            <h3 className="fw-bold text-success mb-0">
              {totalStudents}
            </h3>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <p className="text-muted small fw-semibold mb-1">
              Total Fees
            </p>

            <h3 className="fw-bold text-info mb-0">
              {formatCurrency(totalFees)}
            </h3>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ClassSummary;
