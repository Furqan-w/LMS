import { NextResponse, NextRequest } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Course from "@/models/Course";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const teacherId = req.nextUrl.searchParams.get("teacherId");

    if (!teacherId) {
      return NextResponse.json(
        { message: "Teacher ID required" },
        { status: 400 }
      );
    }

    const courses = await Course.find({ teacherId });

    return NextResponse.json(
      { courses },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
