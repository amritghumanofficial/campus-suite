// src\components\students\classes\ClassForm.jsx

function ClassForm({
  formData,
  editingId,
  handleChange,
  handleSubmit,
  resetForm,
}) {
  return (
    <div
      id="class-form"
      className="card shadow-sm border-0 mb-4"
    >

      <div className="card-header bg-white py-3">
        <h5 className="h6 fw-bold mb-0">
          {editingId ? "✏️ Edit Class" : "Add / Edit Class"}
        </h5>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="row g-3 align-items-end">

            {/* Class Name */}

            <div className="col-12 col-md-6 col-lg">
              <label className="form-label small fw-semibold">
                Class Name
              </label>

              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="e.g. BCA 1st Year"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Teacher */}

            <div className="col-12 col-md-6 col-lg">
              <label className="form-label small fw-semibold">
                Teacher
              </label>

              <input
                type="text"
                name="teacher"
                className="form-control"
                placeholder="e.g. Mr. Sharma"
                value={formData.teacher}
                onChange={handleChange}
              />
            </div>

            {/* Room */}

            <div className="col-12 col-md-4 col-lg">
              <label className="form-label small fw-semibold">
                Room
              </label>

              <input
                type="text"
                name="room"
                className="form-control"
                placeholder="e.g. 204"
                value={formData.room}
                onChange={handleChange}
              />
            </div>

            {/* Capacity */}

            <div className="col-12 col-md-4 col-lg">
              <label className="form-label small fw-semibold">
                Capacity
              </label>

              <input
                type="number"
                min="0"
                name="capacity"
                className="form-control"
                placeholder="50"
                value={formData.capacity}
                onChange={handleChange}
              />
            </div>

            {/* Fees */}

            <div className="col-12 col-md-4 col-lg">
              <label className="form-label small fw-semibold">
                Fees
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  name="totalFees"
                  className="form-control"
                  placeholder="50000"
                  value={formData.totalFees}
                  onChange={handleChange}
                />

              </div>
            </div>

          </div>

          {/* Buttons */}

          <div className="d-flex justify-content-end gap-2 mt-4">

            {editingId && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="btn btn-primary"
            >
              {editingId ? "Update Class" : "Save Class"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ClassForm;
