import { Chapter } from "../../../DB/model/Chapter.js";
import { Exam } from "../../../DB/model/Exam.js";

export const addExam = async (req, res) => {
  const { chapterName, title, examQuestions } = req.body;
  try {
    const chapterId = await Chapter.findOne({ title: chapterName });
    if (!chapterId) {
      res
        .status(404)
        .json({ message: "الفصل الدراسي غير موجود ادخل اسم فصل دراسي صالح" });
    }
    const newExam = new Exam({
      chapterId: chapterId._id,
      title,
      examQuestions,
    });
    await newExam.save();
    await Chapter.findOneAndUpdate(
      { title: chapterName },
      { $push: { exam: newExam._id } }
    );

    res.status(201).json({ message: "تم اضافه امتحان الفصل بنجاح", newExam });
  } catch (err) {
    res.status(500).json({ message: "Failed to add exam", error: err.message });
  }
};
// ==========================================
export const updateExam = async (req, res) => {
  const { id } = req.params;
  const { chapterName, title, examQuestions } = req.body;
  try {
  // find Exam
  const exam = await Exam.findById(id);
  if (!exam) {
    return res.status(404).json({ message: "exam not found." });
  }

  // Update chapter if chapterName is provided
  if (chapterName) {
    const findChap = await Chapter.findOne({ title: chapterName });
    if (!findChap) {
      return res.status(404).json({ message: "chapter not found." });
    }
    exam.chapterId = findChap._id;
  }
  // Update title if title is provided
  if (title) {
    exam.title = title;
  }
  // Update exam questions if examQuestions is provided

      // Update exam questions if examQuestions is provided
      if (examQuestions && Array.isArray(examQuestions)) {
        const updatedQuestions = examQuestions.map((question, index) => {
          // إذا كانت الأسئلة الجديدة، يتم توليد رقم تسلسلي questionIndex
          return {
            questionIndex: index + 1, // الرقم التسلسلي
            questionText: question.questionText,
            type: question.type,
            options: question.options || [],
            correctAnswer: question.correctAnswer || null,
            grade: question.grade
          };
        });
  
        // Replace the questions array
        exam.examQuestions = updatedQuestions;
      }

  // Save the updated exam
  const newExam = await Exam.findByIdAndUpdate(id, exam, { new: true });

  res.status(201).json({ message: "تم تعديل امتحان الفصل بنجاح", newExam });
  } catch (err) {
    res.status(500).json({ message: "Failed to add exam", error: err.message });
  }
};
// ======================================================
export const deleteExam = async (req, res) => {
  const { id } = req.params;
  try {
    const findExam = await Exam.findById(id);
    if (!findExam) {
      res.status(500).json({ message: "هذا الامتحان غير موجود" });
    }
    await Exam.findByIdAndDelete(id);
    res.status(201).json({ message: "exam deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete exam", error: err.message });
  }
};
