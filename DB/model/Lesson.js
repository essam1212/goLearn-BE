import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    schoolYearId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolYear",
      required: true,
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    youtubeLink: {
      type: String,
      required: true,
    },
    pdfLink: {
      type: String,
    },
    lessonPicture: {
      type: String,
    },
    price: {
      type: Number, // سعر الحصة
      required: true,
    },

    examQuestions: [
      {
        questionText: { type: String, required: true },
        type: { type: String, enum: ["essay", "mcq"], required: true },
        options: [String], // في حالة الأسئلة الاختيارية
        correctAnswer: { type: String }, // الإجابة الصحيحة
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
              ref: "Lesson.examQuestions",
            },

            answer: String,
            grade: { type: Number, default: null },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Lesson = mongoose.model("Lesson", lessonSchema);
