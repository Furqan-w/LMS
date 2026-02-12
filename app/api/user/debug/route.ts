import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const allUsers = await User.find({});
    return NextResponse.json(
      { message: "All users in database", users: allUsers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Debug error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
