import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Course from "@/models/Course";

export async function GET() {
  try {
    await connectDB();

    const courses = await Course.find({});

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
