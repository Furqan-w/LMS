"use client";

import { useState } from "react";

interface Course {
  _id: string;
  courseName: string;
  roomNumber: string;
  teacherName: string;
}

export default function StudentOptions() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/user/course/get-all");
      const data = await res.json();

      if (res.ok) {
        setCourses(data.courses);
        setHasFetched(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error fetching courses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3  pt-3 ">
      <button
        onClick={fetchCourses}
        className="bg-emerald-600 text-white px-4 py-2 rounded"
      >
        Show All Available Courses
      </button>

      {loading && (
        <p className="mt-4">Loading courses...</p>
      )}

      {hasFetched && !loading && courses.length === 0 && (
        <p className="mt-4">No courses available.</p>
      )}

      {courses.length > 0 && (
        <div className="mt-6 space-y-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border p-3 rounded shadow-sm"
            >
              <h3 className="font-semibold">
                {course.courseName}
              </h3>
              <p>Room: {course.roomNumber}</p>
              <p className="text-sm text-gray-500">
                Teacher: {course.teacherName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
