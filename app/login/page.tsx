"use client";

import { useState } from "react";
import { authStore } from "@/stores/AuthStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [role, setRole] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    console.log("Login clicked");
    if (!role || !rollNumber || !name) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          uniqueId: rollNumber,
          name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // ✅ Save to MobX
      authStore.setUser(data.user);

      // ✅ Save to sessionStorage
      sessionStorage.setItem("user", JSON.stringify(data.user));

      // alert("Login successful!");

      router.push("/dashboard");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-center">Login Your Account</h1>

        {/* Role Selection */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Select Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">-- Select Role --</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Student Form */}
        {role === "student" && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Roll Number
              </label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Enter roll number"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Student Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        )}

        {/* Teacher Form */}
        {role === "teacher" && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teacher ID / Employee ID
              </label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Enter teacher ID"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teacher Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        )}

        {/* Admin Form */}
        {role === "admin" && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Admin ID
              </label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Enter admin ID"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Admin Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
