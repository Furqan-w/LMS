import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const teacherName = searchParams.get("teacherName");

    if (!teacherName) {
      return NextResponse.json(
        { message: "Teacher name required" },
        { status: 400 }
      );
    }

    const students = await Enrollment.find({ teacherName });

    return NextResponse.json(
      { students },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
