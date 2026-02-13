"use client";

import { useEffect, useState } from "react";

type Teacher = {
  name: string;
  uniqueId: string;
};

export default function ShowAllTeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTeachers = async () => {
    try {
      const res = await fetch("/api/user/teachers");
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to fetch teachers");
        return;
      }

      setTeachers(data.teachers);
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // ✅ DELETE FUNCTION
  const handleDelete = async (uniqueId: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this teacher and all related data?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/user/delete-teacher", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uniqueId }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Teacher deleted successfully");

      // Refresh list
      fetchTeachers();
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">All Teachers</h1>

      {loading && <p>Loading teachers...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && teachers.length === 0 && <p>No teachers found.</p>}

      {!loading && teachers.length > 0 && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Unique ID</th>
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={index} className="border-t hover:bg-gray-100">
                  <td className="p-3">{teacher.name}</td>
                  <td className="p-3">{teacher.uniqueId}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(teacher.uniqueId)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
