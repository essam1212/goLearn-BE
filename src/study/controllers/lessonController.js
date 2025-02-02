import { Chapter } from "../../../DB/model/Chapter.js";
import { Lesson } from "../../../DB/model/Lesson.js";
import { SchoolYear } from "../../../DB/model/SchoolYear.js";

export const addLesson = async (req, res) => {
  const { title, year, chapterName, youtubeLink, price, examQuestions } = req.body;
  const pdfLink = req.files?.pdfLink?.[0]?.path || null;
  const lessonPicture = req.files?.lessonPicture?.[0]?.path || null;

  try {
    const schoolYear = await SchoolYear.findOne({ year });

    const chapter = await Chapter.findOne({ title: chapterName });

    if (!schoolYear) {
      return res.status(404).json({ message: "هذه السنه الدراسيه غير موجوده" });
    }
    if (!chapter) {
      return res.status(404).json({ message: "هذا  الفصل غير موجود" });
    }
    const newLesson = new Lesson({
      title,
      schoolYearId: schoolYear._id,
      chapterId: chapter._id,
      youtubeLink,
      price,
      pdfLink,
      lessonPicture,
      examQuestions,
    });

    await newLesson.save();

    await Chapter.findOneAndUpdate(
      { title: chapterName },
      { $push: { lessons: newLesson._id } }
    );

    res
      .status(201)
      .json({ message: "Lesson added successfully", lesson: newLesson });
  } catch (err) {
    res.status(500).json({ message: "Failed to add lesson",error: err.message });
  }
};
// ======================================

export const updateLesson = async (req, res) => {
  const { title, year, chapterName, youtubeLink, price, examQuestions } = req.body;
  const { id } = req.params;
  const pdfLink = req.files?.pdfLink?.[0]?.path || null;
  const lessonPicture = req.files?.lessonPicture?.[0]?.path || null;

  try {
    // find lesson
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({ message: "lesson not found." });
    }

    // Update chapter if chapterName is provided
    if (chapterName) {
      const findChap = await Chapter.findOne({ title: chapterName });
      if (!findChap) {
        return res.status(404).json({ message: "chapter not found." });
      }
      lesson.chapterId = findChap._id;
    }

    // Update year if year is provided
    if (year) {
      const findYear = await SchoolYear.findOne({ year });
      if (!findYear) {
        return res.status(404).json({ message: "the Year is not found." });
      }
      lesson.schoolYearId = findYear._id;
    }

    // Update exam questions if examQuestions is provided
    if (examQuestions && Array.isArray(examQuestions)) {
      const updatedQuestions = examQuestions.map((question, index) => {
        return {
          questionIndex: index + 1,
          questionText: question.questionText,
          type: question.type,
          options: question.options || [],
          correctAnswer: question.correctAnswer || null,
          grade: question.grade
        };
      });
      lesson.examQuestions = updatedQuestions;
    }

    // Update other fields if provided
    if (title) lesson.title = title;
    if (youtubeLink) lesson.youtubeLink = youtubeLink;
    if (pdfLink) lesson.pdfLink = pdfLink;
    if (lessonPicture) lesson.lessonPicture = lessonPicture;
    if (price) lesson.price = price;

    const newLesson = await Lesson.findByIdAndUpdate(id, lesson, { new: true });

    res.status(201).json({ message: "Lesson updated successfully", lesson: newLesson });
  } catch (err) {
    res.status(500).json({ message: "Failed to update lesson", error: err.message });
  }
}

// -------------------------------------------------------
export const deleteLesson = async (req, res) => {
  const { id } = req.params;
  try {
    const findLesson = await Lesson.findById(id);
    if (!findLesson) {
      res.status(500).json({ message: "هذا الدرس غير موجود" });
    }

    await Lesson.findByIdAndDelete(id);

    res.status(201).json({ message: "lesson deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete lesson", error: error.message });
  }
};

