"use client";

import { useState } from "react";

export default function CreateTeacherPage() {
  const [name, setName] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateTeacher = async () => {
    setError("");
    setSuccess("");

    if (!name.trim() || !uniqueId.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "teacher",
          name,
          uniqueId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      setSuccess("Teacher created successfully!");

      // Clear form
      setName("");
      setUniqueId("");

      // Auto hide success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Teacher ID
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Teacher Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            placeholder="Unique ID"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {success && (
            <p className="text-green-600 text-sm">{success}</p>
          )}

          <button
            onClick={handleCreateTeacher}
            disabled={loading}
            className={`px-4 py-2 rounded text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Creating..." : "Create Teacher"}
          </button>

        </div>
      </div>
    </div>
  );
}
