"use client";

import { observer } from "mobx-react-lite";
import { courseStore } from "@/stores/CourseStore";
  import { authStore } from "@/stores/AuthStore";
  import MyRegisteredCourses from "../components/MyRegisteredCourses";
  import { enrollmentStore } from "@/stores/EnrollmentStore";



const StudentOptions = observer(() => {
  const handleFetch = () => {
    courseStore.fetchAllCourses();
  };


const handleRegister = async (course: any) => {
  try {
    const res = await fetch("/api/user/course/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: authStore.user?.uniqueId,
        studentName: authStore.user?.name,
        teacherName: course.teacherName,
        courseName: course.courseName,
        courseId: course._id,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // Refresh student's registered courses so UI updates immediately
    if (authStore.user?.uniqueId) {
      enrollmentStore.fetchRegistered(authStore.user.uniqueId);
    }

    alert("Registered successfully!");
  } catch (error) {
    alert("Error registering course");
  }
};


  return (
    <div className="mt-3 pt-3">
      <button
        onClick={handleFetch}
        disabled={courseStore.loading}
        className="bg-emerald-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {courseStore.hasFetched
          ? "Courses Loaded"
          : "Show All Available Courses"}
      </button>

      {courseStore.loading && <p className="mt-4">Loading courses...</p>}

      {courseStore.hasFetched &&
        !courseStore.loading &&
        courseStore.courses.length === 0 && (
          <p className="mt-4">No courses available.</p>
        )}
        <MyRegisteredCourses />

      {courseStore.courses.length > 0 && (
        <div className="mt-6 space-y-3">
          {courseStore.courses.map((course) => (
            <div key={course._id} className="border p-3 rounded shadow-sm">
              <h3 className="font-semibold">{course.courseName}</h3>
              <p>Room: {course.roomNumber}</p>
              <p className="text-sm text-gray-500">
                Teacher: {course.teacherName}
              </p>
              <button
                onClick={() => handleRegister(course)}
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
              >
                Register Course
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default StudentOptions;
