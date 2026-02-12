import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ["student", "teacher", "admin"],
    },
    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User =
  models.User || model("User", UserSchema);
