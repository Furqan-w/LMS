"use client";

import { useState } from "react";
import { authStore } from "@/stores/AuthStore";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
  const router = useRouter();
  const [courseName, setCourseName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const handleCreate = async () => {
    if (!courseName || !roomNumber) {
      alert("All fields required");
      return;
    }

    const res = await fetch("/api/user/course/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseName,
        roomNumber,
        teacherId: authStore.user.uniqueId,
        teacherName: authStore.user.name,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Course created successfully!");
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">
          Create Course
        </h1>

        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Make Course
        </button>
      </div>
    </main>
  );
}
