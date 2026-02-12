"use client";

import { useState } from "react";
import { authStore } from "@/stores/AuthStore";

export default function SignupPage() {
  const [role, setRole] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async () => {
    if (!role || !rollNumber || !name) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/user/signup", {
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
      sessionStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

      alert("Signup successful!");
      authStore.setUser(data.user);
      setRole("");
      setRollNumber("");
      setName("");

      window.location.href = "/dashboard";
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-center">
          Sign Up
        </h1>

        {/* Role Selection */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Select Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">-- Select Role --</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Role-specific Fields */}
        {role && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {role === "student" ? "Roll Number" : "Employee ID"}
              </label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Enter unique ID"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleSignup}
              className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
