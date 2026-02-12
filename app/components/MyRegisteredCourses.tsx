"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { authStore } from "@/stores/AuthStore";
import { enrollmentStore } from "@/stores/EnrollmentStore";

const MyRegisteredCourses = observer(() => {
  useEffect(() => {
    if (authStore.user?.uniqueId) {
      enrollmentStore.fetchRegistered(authStore.user.uniqueId);
    }
  }, [authStore.user?.uniqueId]);

  return (
    <div className="mt-6">
      <button
        onClick={() => enrollmentStore.fetchRegistered(authStore.user?.uniqueId)}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Show My Registered Courses
      </button>

      {enrollmentStore.enrollments.map((course: any) => (
        <div key={course._id ?? course.courseId} className="border p-3 mt-3 rounded">
          <h3>{course.courseName}</h3>
          <p>Teacher: {course.teacherName}</p>
        </div>
      ))}
    </div>
  );
});

export default MyRegisteredCourses;
