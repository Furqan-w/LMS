export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-gray-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight">
          About Our LMS
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          This Learning Management System (LMS) is designed with clear
          role-based rules to ensure secure, organized, and effective
          learning workflows.
        </p>

        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          The platform follows a strict hierarchy where actions are
          controlled based on user roles, making the system reliable
          and scalable for real-world educational use.
        </p>

        {/* Role Rules Section */}
        <section className="mt-12 rounded-xl bg-gray-50 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">
            Role-Based Access & Responsibilities
          </h2>

          <ul className="mt-4 space-y-4 text-gray-700">
            <li>
              <span className="font-semibold text-blue-600">Students:</span>{" "}
              Students can register on the platform only after a teacher
              has created and published a course. Enrollment is limited
              to available courses added by teachers.
            </li>

            <li>
              <span className="font-semibold text-green-600">Teachers:</span>{" "}
              Teachers can create and manage courses, and they have the
              authority to add or remove students from their respective
              course sections.
            </li>

            <li>
              <span className="font-semibold text-red-600">Admin:</span>{" "}
              Administrators have full system control. They can add or
              delete students and teachers, manage registrations, and
              add or remove any course across the platform.
            </li>
          </ul>
        </section>

        {/* Mission */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">
            Our Mission
          </h2>

          <p className="mt-3 leading-relaxed text-gray-700">
            Our mission is to build a scalable and secure LMS that
            reflects real-world role-based systems while providing a
            smooth learning experience for students and educators.
          </p>
        </section>
      </div>
    </main>
  );
}
