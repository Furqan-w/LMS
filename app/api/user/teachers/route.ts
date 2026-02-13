import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const teachers = await User.find(
      { role: "teacher" },
      { name: 1, uniqueId: 1, _id: 0 }
    );

    return NextResponse.json(
      { teachers },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
