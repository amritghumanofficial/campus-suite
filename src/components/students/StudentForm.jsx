import { useEffect, useState } from "react";
import Button from "../ui/Button";

const emptyForm = {
  name: "",
  rollNo: "",
  email: "",
  phone: "",
  classId: "",
  course: "",
  joiningDate: "",
  totalFees: "",
};

function StudentForm({
  onSave,
  onCancel,
  submitLabel = "Save Student",
  editingStudent = null,
  classes = [],
}) {
  const [formData, setFormData] = useState(emptyForm);

  const isEditing = Boolean(editingStudent);

  // EDIT STUDENT DATA LOAD
  
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || "",
        rollNo: editingStudent.rollNo || "",
        email: editingStudent.email || "",
        phone: editingStudent.phone || "",

        classId: editingStudent.classId
          ? String(editingStudent.classId)
          : "",

        course: editingStudent.course || "",
        joiningDate: editingStudent.joiningDate || "",
        totalFees: editingStudent.totalFees ?? "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingStudent]);

  // INPUT CHANGE

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // CLASS CHANGE

  const handleClassChange = (e) => {
    const selectedClassId = e.target.value;

    const selectedClass = classes.find(
      (classItem) =>
        String(classItem.id) === String(selectedClassId)
    );

 setFormData((prev) => ({
    ...prev,
    classId: selectedClassId,

    
    course: selectedClass?.name || "",

    totalFees: selectedClass
      ? selectedClass.totalFees
      : "",
  }));
  };

  // FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.rollNo.trim() ||
      !formData.classId
    ) {
      return;
    }

    const selectedClass = classes.find(
      (classItem) =>
        String(classItem.id) === String(formData.classId)
    );

    const studentData = {
      name: formData.name.trim(),
      rollNo: formData.rollNo.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),


      classId: formData.classId,

      course:
        selectedClass?.name ||
        formData.course,

      joiningDate: formData.joiningDate,

      totalFees:
        Number(formData.totalFees) || 0,

      ...(isEditing
        ? {}
        : {
            paidFees: 0,
          }),
    };

    onSave(studentData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">

        {/* STUDENT NAME */}

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Student Name
            <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter student name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* ROLL NUMBER */}

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Roll Number
            <span className="text-danger"> *</span>
          </label>

          <input
            type="text"
            name="rollNo"
            className="form-control"
            placeholder="e.g. STU-001"
            value={formData.rollNo}
            onChange={handleChange}
            required
          />
        </div>

        {/* EMAIL */}

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="student@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* PHONE */}

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            className="form-control"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* CLASS SELECT */}

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Class / Batch
            <span className="text-danger"> *</span>
          </label>

          <select
            name="classId"
            className="form-select"
            value={formData.classId}
            onChange={handleClassChange}
            required
          >
            <option value="">
              Select Class / Batch
            </option>

            {classes.length === 0 ? (
              <option disabled>
                No classes available
              </option>
            ) : (
              classes.map((classItem) => (
                <option
                  key={classItem.id}
                  value={classItem.id}
                >
                  {classItem.name}
                </option>
              ))
            )}
          </select>

          {classes.length === 0 && (
            <small className="text-danger">
              Please create a class first.
            </small>
          )}
        </div>


        {/* ADMISSION DATE */}

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Admission Date
          </label>

          <input
            type="date"
            name="joiningDate"
            className="form-control"
            value={formData.joiningDate}
            onChange={handleChange}
          />
        </div>


        {/* TOTAL FEES */}

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Total Course Fees
          </label>

          <div className="input-group">
            <span className="input-group-text">
              ₹
            </span>

            <input
              type="number"
              name="totalFees"
              className="form-control"
              placeholder="Enter total fees"
              min="0"
              value={formData.totalFees}
              onChange={handleChange}
            />
          </div>

          <small className="text-muted">
            Total amount payable by this student.
          </small>
        </div>


        {/* FEE PREVIEW */}

        <div className="col-md-6">
          <div className="bg-light border rounded p-3 h-100">
            <div className="small text-muted mb-1">
              Initial Fee Status
            </div>

            <div className="d-flex justify-content-between">
              <span>Total Fees</span>

              <strong>
                ₹
                {(
                  Number(formData.totalFees) || 0
                ).toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="d-flex justify-content-between mt-1">
              <span>Paid</span>

              <span className="text-success fw-semibold">
                ₹0
              </span>
            </div>

            <div className="d-flex justify-content-between mt-1">
              <span>Pending</span>

              <span className="text-danger fw-semibold">
                ₹
                {(
                  Number(formData.totalFees) || 0
                ).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      {/* FORM ACTIONS */}

      <div className="d-flex justify-content-end gap-2">

        <Button
          variant="secondary"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={classes.length === 0}
        >
          {submitLabel}
        </button>

      </div>
    </form>
  );
}

export default StudentForm;
