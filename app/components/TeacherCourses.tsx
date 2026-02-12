"use client";

import { useEffect, useState } from "react";
import { authStore } from "@/stores/AuthStore";

interface Course {
  _id: string;
  courseName: string;
  roomNumber: string;
}

export default function TeacherCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await fetch(
        `/api/user/course/get-by-teacher?teacherId=${authStore.user?.uniqueId}`
      );

      const data = await res.json();

      if (res.ok) {
        setCourses(data.courses);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error fetching courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authStore.user?.uniqueId) {
      fetchCourses();
    }
  }, []);

  const handleDelete = async (courseId: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/user/course/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          teacherId: authStore.user?.uniqueId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // 🔥 Remove deleted course from UI instantly
      setCourses((prev) =>
        prev.filter((course) => course._id !== courseId)
      );

      // alert("Course deleted successfully");
    } catch (error) {
      alert("Error deleting course");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (courses.length === 0)
    return <p>No courses created yet.</p>;

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div
          key={course._id}
          className="border p-4 rounded shadow-sm flex justify-between items-center"
        >
          <div>
            <h2 className="font-semibold">
              {course.courseName}
            </h2>
            <p>Room: {course.roomNumber}</p>
          </div>

          <button
            onClick={() => handleDelete(course._id)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
