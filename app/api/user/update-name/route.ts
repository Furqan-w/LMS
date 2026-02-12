import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req: Request) {
  try {
    // 1️⃣ Read request body
    const { uniqueId, name } = await req.json();

    // 2️⃣ Validate input
    if (!uniqueId || !name) {
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    // 3️⃣ Connect to MongoDB
    await connectDB();

    // 4️⃣ Update user in database
    const updatedUser = await User.findOneAndUpdate(
      { uniqueId },
      { name },
      { new: true } // returns updated document
    );

    // 5️⃣ If user not found
    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // 6️⃣ Return updated user
    return NextResponse.json(
      { message: "Name updated successfully", user: updatedUser },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
