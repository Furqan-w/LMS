import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { enrollmentId, teacherName } = await req.json();

    if (!enrollmentId || !teacherName) {
      return NextResponse.json(
        { message: "Enrollment ID and Teacher required" },
        { status: 400 }
      );
    }

    // Ensure teacher can only remove their own students
    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      teacherName,
    });

    if (!enrollment) {
      return NextResponse.json(
        { message: "Not authorized or not found" },
        { status: 404 }
      );
    }

    await Enrollment.deleteOne({ _id: enrollmentId });

    return NextResponse.json(
      { message: "Student removed from course" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
