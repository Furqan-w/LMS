"use client";

import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { authStore } from "@/stores/AuthStore";
import { useRouter } from "next/navigation";
import TeacherOptions from "../components/TeacherOptions";
import StudentOptions from "../components/StudentOptions";

const DashboardPage = observer(() => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!authStore.user) {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        authStore.setUser(parsed);
        setNewName(parsed.name);
      } else {
        router.push("/login");
        return;
      }
    } else {
      setNewName(authStore.user.name);
    }
    setIsMounted(true);
  }, [router]);

  // Show loading state instead of null
  if (!isMounted) {
    return null;
  }

  if (!authStore.user) {
    return null;
  }
  const handleUpdate = async () => {
    if (!newName.trim()) {
      alert("Name cannot be empty");
      return;
    }

    try {
      const res = await fetch("/api/user/update-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uniqueId: authStore.user.uniqueId,
          name: newName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      authStore.setUser(data.user);
      setIsEditing(false);
      alert("Name updated successfully!");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        {!isEditing ? (
          <>
            <h1 className="text-2xl font-bold">
              Welcome {authStore.user.name}
            </h1>

            <p className="mt-4">
              Role: <strong>{authStore.user.role}</strong>
            </p>

            <p>
              ID: <strong>{authStore.user.uniqueId}</strong>
            </p>

            <button
              onClick={() => {
                setNewName(authStore.user.name);
                setIsEditing(true);
              }}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit Name
            </button>

            {/* ✅ Show Teacher Options Only For Teachers */}
            {authStore.user.role === "teacher" && (
              <div className="mt-6 border-t pt-6">
                <TeacherOptions />
              </div>
            )}

            {authStore.user.role === "student" && (
              <div className="mt-6 border-t pt-6">
                <StudentOptions />
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Edit Name</h2>

            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
});

export default DashboardPage;
