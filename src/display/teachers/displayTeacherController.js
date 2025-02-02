import { Chapter } from "../../../DB/model/Chapter.js";
import { Exam } from "../../../DB/model/Exam.js";
import { Lesson } from "../../../DB/model/Lesson.js";
import { SchoolYear } from "../../../DB/model/SchoolYear.js";
import { Teacher } from "../../../DB/model/Teacher.js";

export const getAllYears = async (req, res) => {
  const teacherId = req.teacher._id;
  try {
    // التحقق من وجود المدرس

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "المدرس غير موجود." });
    }
    const chapters = await Chapter.find({ teacherId }).populate(
      "SchoolYearId",
      "year"
    );

    const uniqueYears = [
      ...new Set(chapters.map((chapter) => chapter.SchoolYearId.year)),
    ];

    res.status(200).json({
      schoolYears: uniqueYears,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء استرجاع البيانات." });
  }
};
// -------------------------عرض المنهج----------------------------
export const getStudyContent = async (req, res) => {
  const { yearId } = req.params;
  const teacherId = req.teacher._id;
  try {
    const chapters = await Chapter.find({
      SchoolYearId: yearId,
      teacherId,
    })
      .populate("lessons")
      .populate({
        path: "exam",
        select: "title examQuestions",
      });
    if (!chapters || chapters.length === 0) {
      return res.status(404).json({ message: "لا توجد مناهج لهذه السنة." });
    }
    const studyContent = chapters.map((chapter) => ({
      chapterTitle: chapter.title,
      lessons: chapter.lessons.map((lesson) => ({
        title: lesson.title,
      
      })),
      exam: chapter.exam ? {
        title: chapter.exam.title,
      } : null,
    }));
    res.status(200).json({ studyContent });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء استرجاع البيانات." });
  }
};
// =====================عرض الحصه=========================
export const getLessonContent=async(req,res)=>{
    try {

      const { lessonId} = req.params;
      const lesson = await Lesson.findById({ _id: lessonId });
      if (!lesson) {
        return res.status(404).json({ message: "هذه المحاضره غير موجوده" });
      }
      res.status(200).json(lesson);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
}
// ===============عرض الامتحان الشامل ==========================
export const getExamContent=async(req,res)=>{
  try {

    const { examId} = req.params;
    const exam = await Exam.findById({ _id: examId });
    if (!exam) {
      return res.status(404).json({ message: "هذا الامتحان غير موجود" });
    }
    res.status(200).json(exam);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

