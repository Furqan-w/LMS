import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import Course from "@/models/Course";
import Enrollment from "@/models/Enrollment";

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { uniqueId } = await req.json();

    if (!uniqueId) {
      return NextResponse.json(
        { message: "uniqueId is required" },
        { status: 400 }
      );
    }

    // 1️⃣ Find teacher
    const teacher = await User.findOne({
      uniqueId,
      role: "teacher",
    });

    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Find courses created by teacher
    const teacherCourses = await Course.find({
      teacherId: teacher.uniqueId,
    });

    const courseIds = teacherCourses.map(course =>
      course._id.toString()
    );

    // 3️⃣ Delete enrollments linked to those courses
    await Enrollment.deleteMany({
      courseId: { $in: courseIds },
    });

    // 4️⃣ Delete courses
    await Course.deleteMany({
      teacherId: teacher.uniqueId,
    });

    // 5️⃣ Delete teacher
    await User.deleteOne({
      uniqueId: teacher.uniqueId,
      role: "teacher",
    });

    return NextResponse.json(
      { message: "Teacher and related data deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
