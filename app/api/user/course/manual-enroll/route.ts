import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      teacherId,
      teacherName,
      courseId,
      courseName,
      studentId,
      studentName,
    } = await req.json();

    const exists = await Enrollment.findOne({
      studentId,
      courseId,
    });

    if (exists) {
      return NextResponse.json(
        { message: "Student already enrolled" },
        { status: 400 }
      );
    }

    await Enrollment.create({
      teacherName,
      studentName,
      studentId,
      courseName,
      courseId,
    });

    return NextResponse.json(
      { message: "Student enrolled successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
