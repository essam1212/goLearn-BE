import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  SchoolYearId: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolYear",required: true },

  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  title: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },

  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" }
});

export const Chapter = mongoose.model("Chapter", chapterSchema);

