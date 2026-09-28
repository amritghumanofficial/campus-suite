import { useEffect, useState } from "react";

function FeesForm({ student, onSubmit, onCancel }) {
  const [payment, setPayment] = useState("");

  const totalFees = Number(student?.totalFees) || 0;
  const paidFees = Number(student?.paidFees) || 0;

  const pendingFees = Math.max(
    totalFees - paidFees,
    0
  );

  const paymentAmount = Number(payment) || 0;

  const remainingAfterPayment = Math.max(
    pendingFees - paymentAmount,
    0
  );

  useEffect(() => {
    setPayment("");
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!student) return;

    if (paymentAmount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    if (paymentAmount > pendingFees) {
      alert(
        `Payment cannot be greater than pending fee ₹${pendingFees.toLocaleString()}`
      );
      return;
    }

    onSubmit({
      studentId: student.id,
      amount: paymentAmount,
    });
  };

  if (!student) {
    return null;
  }

  return (
    <div className="card border-0 shadow-sm">

      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
           Collect Student Fee
        </h5>
      </div>

      <div className="card-body">

        {/* Student Information */}
        <div className="d-flex align-items-center gap-3 mb-4">

          <div
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
            style={{
              width: "48px",
              height: "48px",
            }}
          >
            {student.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h5 className="mb-1">
              {student.name}
            </h5>

            <small className="text-muted">
              Roll No: #{student.rollNo} • {student.course}
            </small>
          </div>

        </div>

        {/* Fee Summary */}
        <div className="row g-3 mb-4">

          <div className="col-md-4">
            <div className="bg-light rounded p-3">
              <small className="text-muted d-block">
                Total Fees
              </small>

              <h5 className="fw-bold mb-0">
                ₹{totalFees.toLocaleString()}
              </h5>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bg-success bg-opacity-10 rounded p-3">
              <small className="text-success d-block">
                Already Paid
              </small>

              <h5 className="fw-bold text-success mb-0">
                ₹{paidFees.toLocaleString()}
              </h5>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bg-danger bg-opacity-10 rounded p-3">
              <small className="text-danger d-block">
                Pending
              </small>

              <h5 className="fw-bold text-danger mb-0">
                ₹{pendingFees.toLocaleString()}
              </h5>
            </div>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Payment Input */}
          <div className="mb-3">

            <label className="form-label fw-semibold">
              This Payment
            </label>

            <div className="input-group input-group-lg">
              <span className="input-group-text">
                ₹
              </span>

              <input
                type="number"
                className="form-control"
                placeholder="Enter payment amount"
                min="1"
                max={pendingFees}
                value={payment}
                onChange={(e) =>
                  setPayment(e.target.value)
                }
                disabled={pendingFees === 0}
                required
              />
            </div>

            <small className="text-muted">
              Maximum payment: ₹
              {pendingFees.toLocaleString()}
            </small>

          </div>

          {/* Remaining Preview */}
          {paymentAmount > 0 && (
            <div className="alert alert-info">

              <div className="d-flex justify-content-between">
                <span>Payment:</span>

                <strong>
                  ₹{paymentAmount.toLocaleString()}
                </strong>
              </div>

              <div className="d-flex justify-content-between">
                <span>Remaining:</span>

                <strong>
                  ₹
                  {remainingAfterPayment.toLocaleString()}
                </strong>
              </div>

            </div>
          )}

          {pendingFees === 0 && (
            <div className="alert alert-success">
               This student's fees are completely paid.
            </div>
          )}

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-4">

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                pendingFees === 0 ||
                paymentAmount <= 0 ||
                paymentAmount > pendingFees
              }
            >
               Submit Payment
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default FeesForm;
