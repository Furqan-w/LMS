"use client";

import { useRouter } from "next/navigation";

export default function AdminOptions() {
  const router = useRouter();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Admin Options</h2>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => router.push("/dashboard/show-all-teachers")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Show All Teachers
        </button>

        <button
          onClick={() => router.push("/dashboard/create-teacher")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Teacher ID
        </button>

        <button
          onClick={() => router.push("/dashboard/delete-student")}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete Student
        </button>

        <button
          onClick={() => router.push("/dashboard/delete-teacher")}
          className="bg-red-700 text-white px-4 py-2 rounded"
        >
          Delete Teacher
        </button>
      </div>
    </div>
  );
}
