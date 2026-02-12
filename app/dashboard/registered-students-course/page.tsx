"use client";

import DisplayCourseRegisteredStudents from "../../components/DisplayCourseRegisteredStudents";

export default function RegisteredStudentsPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-[600px]">
        <h1 className="text-2xl font-bold mb-6">
          Registered Students
        </h1>

        <DisplayCourseRegisteredStudents />
      </div>
    </main>
  );
}
