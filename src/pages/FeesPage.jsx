import { useMemo, useState } from "react";

import FeesForm from "../components/students/fees/FeesForm";
import FeeSummary from "../components/students/fees/FeeSummary";
import FeeStudentSelect from "../components/students/fees/FeeStudentSelect";
import FeeTable from "../components/students/fees/FeeTable";

function FeesPage({ students = [], onUpdateFees }) {

  const [selectedStudentId, setSelectedStudentId] =
    useState("");

  const selectedStudent = students.find(
    (student) =>
      String(student.id) ===
      String(selectedStudentId)
  );

  const feeStats = useMemo(() => {

    let totalFees = 0;
    let totalPaid = 0;
    let totalPending = 0;

    students.forEach((student) => {

      const total =
        Number(student.totalFees) || 0;

      const paid =
        Number(student.paidFees) || 0;

      const pending =
        Math.max(total - paid, 0);

      totalFees += total;
      totalPaid += paid;
      totalPending += pending;
    });

    return {
      totalFees,
      totalPaid,
      totalPending,
    };

  }, [students]);

  const handlePayment = ({ studentId, amount }) => {

    onUpdateFees(studentId, amount);

    setSelectedStudentId("");

    alert("Fee payment updated successfully!");
  };

  return (
    <div className="container-fluid">

      <div className="mb-4">

        <h3 className="fw-bold text-primary mb-1">
          Student Fees Management
        </h3>

        <p className="text-muted small mb-0">
          Manage student fees, payments and pending balances
        </p>

      </div>

      <FeeSummary feeStats={feeStats} />

      {selectedStudent ? (

        <div className="mb-4">

          <FeesForm
            student={selectedStudent}
            onSubmit={handlePayment}
            onCancel={() =>
              setSelectedStudentId("")
            }
          />

        </div>

      ) : (

        <FeeStudentSelect
          students={students}
          selectedStudentId={selectedStudentId}
          setSelectedStudentId={setSelectedStudentId}
        />

      )}

      <FeeTable
        students={students}
        onCollectFee={setSelectedStudentId}
      />

    </div>
  );
}

export default FeesPage;
