import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import {User} from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const students = await User.find({ role: "student" });

    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
