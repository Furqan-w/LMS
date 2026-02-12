import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";


export async function POST(req: Request) {
  try {
    let { role, uniqueId, name } = await req.json();

    if (!role || !uniqueId || !name) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Trim whitespace from inputs
    role = role.trim().toLowerCase();
    uniqueId = uniqueId.trim();
    name = name.trim();

    await connectDB();

    // First try exact match
    let user = await User.findOne({
      role,
      uniqueId,
      name,
    });

    // If not found, try case-insensitive name match
    if (!user) {
      user = await User.findOne({
        role,
        uniqueId,
        name: { $regex: `^${name}$`, $options: "i" },
      });
    }
    // console.log(`Login attempt - Role: ${role}, UniqueId: ${uniqueId}, Name: ${name}`);

    if (!user) {
      console.log(`Login failed - No user found for role: ${role}, uniqueId: ${uniqueId}, name: ${name}`);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
