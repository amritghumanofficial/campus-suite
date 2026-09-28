function StudentRow({ student, onEdit, onDelete, onView }) {
  return (
    <tr>
      <td className="fw-semibold">#{student.rollNo}</td>

      <td>
        <div className="d-flex align-items-center gap-2">
          <div
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
            style={{ width: "36px", height: "36px" }}
          >
            {student.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <div className="fw-semibold">{student.name}</div>
            <small className="text-muted">{student.email}</small>
          </div>
        </div>
      </td>

      <td>
        <span className="badge bg-light text-dark border">
          {student.course}
        </span>
      </td>

      <td>{student.phone || "N/A"}</td>

      <td className="text-end">
        <button
          type="button"
          className="btn btn-sm btn-outline-info me-2"
          onClick={() => onView?.(student)}
        >
          View
        </button>

        <button
          type="button"
          className="btn btn-sm btn-outline-primary me-2"
          onClick={() => onEdit(student)}
        >
          Edit
        </button>

        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default StudentRow;
