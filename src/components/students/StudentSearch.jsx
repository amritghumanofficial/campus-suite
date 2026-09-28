function StudentSearch({ search, setSearch }) {
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <div className="row align-items-center g-2">
          <div className="col-md-8">
            <label className="form-label small fw-semibold text-muted mb-1">
              Search Students
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Search by name, roll number or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4 text-md-end">
            <span className="text-muted small">
               Search results update automatically
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentSearch;
