"use client";

import { useState } from "react";
import { authStore } from "@/stores/AuthStore";

export default function MyRegisteredCourses() {
  const [courses, setCourses] = useState([]);

  const fetchRegistered = async () => {
    const res = await fetch(
      `/api/user/course/get-registered?studentId=${authStore.user?.uniqueId}`
    );

    const data = await res.json();

    if (res.ok) {
      setCourses(data.enrollments);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={fetchRegistered}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Show My Registered Courses
      </button>

      {courses.map((course: any) => (
        <div
          key={course._id}
          className="border p-3 mt-3 rounded"
        >
          <h3>{course.courseName}</h3>
          <p>Teacher: {course.teacherName}</p>
        </div>
      ))}
    </div>
  );
}
