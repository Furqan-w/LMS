import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      studentId,
      studentName,
      teacherName,
      courseName,   
      courseId,
    } = await req.json();

    if (
      !studentId ||
      !studentName ||
      !teacherName ||
      !courseName ||
      !courseId
    ) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    // Prevent duplicate registration
    const existing = await Enrollment.findOne({
      studentId,
      courseId,
    });

    if (existing) {
      return NextResponse.json(
        { message: "Already registered" },
        { status: 400 }
      );
    }

    await Enrollment.create({
      studentId,
      studentName,
      teacherName,
      courseName,
      courseId,
    });

    return NextResponse.json(
      { message: "Registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
