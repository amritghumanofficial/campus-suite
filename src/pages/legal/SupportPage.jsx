function SupportPage({ onBack }) {
  return (
    <div className="container py-4">
      <button className="btn btn-outline-secondary mb-3 btn-sm" onClick={onBack}>
         Back to Portal
      </button>
      <div className="card shadow-sm p-4 border-0">
        <h3 className="fw-bold text-primary mb-2"> Help & Support Center</h3>
        <p className="text-muted small">Assistance for Student Hub Administrators</p>
        <hr />
        <div className="row g-3 mt-1">
          <div className="col-md-6">
            <div className="p-3 border rounded bg-light">
              <h6 className="fw-bold mb-1"> Email Support</h6>
              <p className="text-muted small mb-0">support@campussuite.com</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 border rounded bg-light">
              <h6 className="fw-bold mb-1"> Helpdesk Line</h6>
              <p className="text-muted small mb-0">+91 1800-123-4567 (Mon - Fri)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;