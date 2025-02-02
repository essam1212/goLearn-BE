import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
  title: { type: String, required: true },

  examQuestions: [
    {
      questionText: { type: String, required: true },
      type: { type: String, enum: ["essay", "mcq"], required: true },
      options: [String], // في حالة الأسئلة الاختيارية
      correctAnswer: { type: String }, // الإجابة الصحيحة في حالة الأسئلة الاختيارية
      grade: { type: Number, required: true }, // درجة السؤال
    },
  ],
  studentAnswers: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      answers: [
        {
          questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam.examQuestions",
          },

          answer: String,
          grade: { type: Number, default: null }

        },
      ],
    },
  ],
});
export const Exam = mongoose.model("Exam", examSchema);
