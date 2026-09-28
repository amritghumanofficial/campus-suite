function TermsOfServicePage({ onBack }) {
  return (
    <div className="container py-4">
      <button className="btn btn-outline-secondary mb-3 btn-sm" onClick={onBack}>
         Back to Portal
      </button>
      <div className="card shadow-sm p-4 border-0">
        <h3 className="fw-bold text-primary mb-2">Terms of Service</h3>
        <p className="text-muted small">Last updated: September 2026</p>
        <hr />
        <h6 className="fw-semibold mt-3">1. Acceptable Use</h6>
        <p className="text-secondary small">
          This portal is designed for academic administrative use only. Authorized personnel are responsible for ensuring student data entries are accurate.
        </p>
        
        <h6 className="fw-semibold mt-3">2. Account Responsibility</h6>
        <p className="text-secondary small">
          Admins must safeguard their login credentials. Any modifications made under an active session will be attributed to that logged-in user.
        </p>
      </div>
    </div>
  );
}

export default TermsOfServicePage;