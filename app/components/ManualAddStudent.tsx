"use client";

import { useEffect, useState } from "react";
import { authStore } from "@/stores/AuthStore";

interface Course {
  _id: string;
  courseName: string;
}

interface Student {
  _id: string;
  name: string;
  uniqueId: string;
}

export default function ManualAddStudent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get teacher courses
        const resCourses = await fetch(
          `/api/user/course/get-by-teacher?teacherId=${authStore.user?.uniqueId}`
        );
        const dataCourses = await resCourses.json();

        if (resCourses.ok) {
          setCourses(dataCourses.courses);
        }

        // Get all students
        const resStudents = await fetch("/api/user/get-students");
        const dataStudents = await resStudents.json();

        if (resStudents.ok) {
          setStudents(dataStudents.students);
        }
      } catch (error) {
        alert("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    if (authStore.user?.uniqueId) {
      fetchData();
    }
  }, []);

  const handleEnroll = async () => {
    if (!selectedCourse || !selectedStudent) {
      alert("Select both course and student");
      return;
    }

    const course = courses.find(c => c._id === selectedCourse);
    const student = students.find(s => s.uniqueId === selectedStudent);
// manual enroll path not  sed , beacuse register remail already exists
    const res = await fetch("/api/user/course/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherId: authStore.user?.uniqueId,
        teacherName: authStore.user?.name,
        courseId: course?._id,
        courseName: course?.courseName,
        studentId: student?.uniqueId,
        studentName: student?.name,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Student enrolled successfully!");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">

      {/* Course Dropdown */}
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="">Select Course</option>
        {courses.map(course => (
          <option key={course._id} value={course._id}>
            {course.courseName}
          </option>
        ))}
      </select>

      {/* Student Dropdown */}
      <select
        value={selectedStudent}
        onChange={(e) => setSelectedStudent(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="">Select Student</option>
        {students.map(student => (
          <option key={student._id} value={student.uniqueId}>
            {student.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleEnroll}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Enroll Student
      </button>
    </div>
  );
}
