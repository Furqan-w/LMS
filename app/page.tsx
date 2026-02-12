import RoleCard from "./components/RoleCard";

const roles = [
  {
    title: "Students",
    color: "text-blue-600",
    description:
      "Students can register on the platform, browse available courses, enroll in their desired subjects, and track their learning progress in one centralized system.",
  },
  {
    title: "Teachers",
    color: "text-green-600",
    description:
      "Teachers have the ability to create new courses, upload learning materials, and manage enrolled students, enabling effective course delivery.",
  },
  {
    title: "Admin",
    color: "text-red-600",
    description:
      "Administrators have full control over the system. They can add, edit, or delete any course, manage users, and ensure the platform operates smoothly and securely.",
  },
];

export default function LMSPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 text-gray-900">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Learning Management System (LMS)
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            A modern platform designed to manage courses, students, and instructors efficiently.
          </p>
        </header>

        {/* Roles Section */}
        <section className="mt-10 grid gap-8 rounded-xl border-2 border-black p-6 md:grid-cols-3">
          {roles.map((role) => (
            <RoleCard
              key={role.title}
              title={role.title}
              color={role.color}
              description={role.description}
            />
          ))}
        </section>

        {/* Footer Message */}
        <section className="mt-6 ">
          <p className="text-gray-600">
            This LMS is built with scalability, performance, and role-based access
            control to support real-world educational environments.
          </p>
        </section>

      </div>
    </main>
  );
}
