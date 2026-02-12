import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Course from "@/models/Course";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { courseName, roomNumber, teacherId, teacherName } =
      await req.json();

    if (!courseName || !roomNumber || !teacherId) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    const newCourse = await Course.create({
      courseName,
      roomNumber,
      teacherId,
      teacherName,
    });

    return NextResponse.json(
      { message: "Course created", course: newCourse },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
