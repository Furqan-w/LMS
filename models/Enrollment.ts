import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    teacherName: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Enrollment ||
  mongoose.model("Enrollment", EnrollmentSchema);
