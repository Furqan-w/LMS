"use client";

import { useState, useEffect } from "react";
import { authStore } from "@/stores/AuthStore";

interface Enrollment {
  _id: string;
  studentName: string;
  courseName: string;
}

export default function DisplayCourseRegisteredStudents() {
  const [students, setStudents] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegisteredStudents = async () => {
      try {
        const res = await fetch(
          `/api/user/course/get-registered-by-teacher?teacherName=${authStore.user?.name}`
        );

        const data = await res.json();

        if (res.ok) {
          setStudents(data.students);
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert("Error fetching students");
      } finally {
        setLoading(false);
      }
    };

    if (authStore.user?.name) {
      fetchRegisteredStudents();
    }
  }, []);

  // ✅ NEW FUNCTION (ADDED ONLY)
  const handleRemove = async (enrollmentId: string) => {
    const confirmRemove = confirm(
      "Are you sure you want to remove this student?"
    );

    if (!confirmRemove) return;

    try {
      const res = await fetch(
        "/api/user/course/remove-registration",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            enrollmentId,
            teacherName: authStore.user?.name,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // ✅ Remove from UI instantly
      setStudents((prev) =>
        prev.filter((student) => student._id !== enrollmentId)
      );

      alert("Student removed successfully");
    } catch (error) {
      alert("Error removing student");
    }
  };

  if (loading) {
    return <p className="mt-4">Loading registered students...</p>;
  }

  if (students.length === 0) {
    return (
      <p className="mt-4">
        No students registered yet.
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {students.map((student) => (
        <div
          key={student._id}
          className="border p-3 rounded shadow-sm flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">
              {student.studentName}
            </h3>
            <p>Course: {student.courseName}</p>
          </div>

          {/* ✅ NEW BUTTON */}
          <button
            onClick={() => handleRemove(student._id)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
