"use client";

import { useRouter } from "next/navigation";

export default function TeacherOptions() {
  const router = useRouter();

  return (
    <div className="mt-6 flex gap-4">
      <button
        onClick={() => router.push("/dashboard/create-course")}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Create Course
      </button>

       <button
        onClick={() => router.push("/dashboard/show-courses")}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Show Courses
      </button>
    </div>
  );
}
