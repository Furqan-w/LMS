import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Course from "@/models/Course";

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { courseId, teacherId } = await req.json();

    if (!courseId || !teacherId) {
      return NextResponse.json(
        { message: "Course ID and Teacher ID required" },
        { status: 400 }
      );
    }

    const course = await Course.findOne({
      _id: courseId,
      teacherId,
    });

    if (!course) {
      return NextResponse.json(
        { message: "Course not found or unauthorized" },
        { status: 404 }
      );
    }

    await Course.deleteOne({ _id: courseId });

    return NextResponse.json(
      { message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
