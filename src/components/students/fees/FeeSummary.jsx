function FeeSummary({ feeStats }) {
  return (
    <div className="row g-3 mb-4">

      <div className="col-md-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <small className="text-muted">
              Total Fees
            </small>

            <h4 className="fw-bold mt-1 mb-0">
              ₹{feeStats.totalFees.toLocaleString("en-IN")}
            </h4>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <small className="text-success">
              Total Collected
            </small>

            <h4 className="fw-bold text-success mt-1 mb-0">
              ₹{feeStats.totalPaid.toLocaleString("en-IN")}
            </h4>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <small className="text-danger">
              Total Pending
            </small>

            <h4 className="fw-bold text-danger mt-1 mb-0">
              ₹{feeStats.totalPending.toLocaleString("en-IN")}
            </h4>
          </div>
        </div>
      </div>

    </div>
  );
}

export default FeeSummary;
