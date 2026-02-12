"use client";

import ManualAddStudent from "../../components/ManualAddStudent";

export default function AddManuallyStudentPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-[600px]">
        <h1 className="text-2xl font-bold mb-6">
          Manually Enroll Student
        </h1>

        <ManualAddStudent />
      </div>
    </main>
  );
}
