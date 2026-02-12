"use client";

import TeacherCourses from "../../components/TeacherCourses";


export default function ShowCoursesPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-[500px]">
        <h1 className="text-2xl font-bold mb-6">
          All Courses That You Created
        </h1>

        <TeacherCourses />
      </div>
    </main>
  );
}
