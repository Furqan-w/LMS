import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    const enrollments = await Enrollment.find({ studentId });

    return NextResponse.json(
      { enrollments },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
