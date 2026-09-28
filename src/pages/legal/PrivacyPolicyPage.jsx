function PrivacyPolicyPage({ onBack }) {
  return (
    <div className="container py-4">
      <button className="btn btn-outline-secondary mb-3 btn-sm" onClick={onBack}>
        Back to Portal
      </button>
      <div className="card shadow-sm p-4 border-0">
        <h3 className="fw-bold text-primary mb-2">Privacy Policy</h3>
        <p className="text-muted small">Last updated: September 2026</p>
        <hr />
        <h6 className="fw-semibold mt-3">1. Information Collection</h6>
        <p className="text-secondary small">
          We store student information, attendance logs, and admin session states locally within your browser's LocalStorage to maintain portal functionality.
        </p>
        
        <h6 className="fw-semibold mt-3">2. Data Security & Storage</h6>
        <p className="text-secondary small">
          Your data is isolated to your local device environment and is not shared with any external third-party analytics or external tracking tools.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;