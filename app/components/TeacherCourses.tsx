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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`/api/user/course/get-by-teacher?teacherId=${authStore.user?.uniqueId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

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

    if (authStore.user?.uniqueId) {
      fetchCourses();
    }
  }, []);

  if (loading) return <p>Loading...</p>;

  if (courses.length === 0)
    return <p>No courses created yet.</p>;

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div
          key={course._id}
          className="border p-4 rounded shadow-sm"
        >
          <h2 className="font-semibold">
            {course.courseName}
          </h2>
          <p>Room: {course.roomNumber}</p>
        </div>
      ))}
    </div>
  );
}
