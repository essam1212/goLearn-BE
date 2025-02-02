import e from "cors";
import { Chapter } from "../../../DB/model/Chapter.js";
import { Exam } from "../../../DB/model/Exam.js";
import { Lesson } from "../../../DB/model/Lesson.js";
import { SchoolYear } from "../../../DB/model/SchoolYear.js";
import { Subject } from "../../../DB/model/Subject.js";
import { Teacher } from "../../../DB/model/Teacher.js";
import { correctEssayAnswer } from "./correctEssayAnswer.js";
export const allSubjects = async (req, res) => {
  try {
    const { year, section, division } = req.student;

    // التحقق من وجود السنة الدراسية
    const schoolYear = await SchoolYear.findById({ _id: year }).populate(
      "subjectIds"
    );
    if (!schoolYear) {
      return res.status(404).json({ message: "Year not found" });
    }

    // تصفية المواد بناءً على القسم المتاح
    const filteredSubjects = schoolYear.subjectIds.filter((subject) => {
      return (
        subject.availableFor === "كيلاهما" || // المواد العامة
        (subject.availableFor === division && subject.section === section) // مواد القسم المناسب
      );
    });

    res.status(200).json({ subjects: filteredSubjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء استرجاع المواد الدراسية" });
  }
};

//------------------- صفحه المدرسين--------------------------------

export const allTeachers = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { division } = req.student; // استخراج القسم (عام أو أزهري) من بيانات الطالب

    // التحقق من وجود المادة
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // البحث عن المدرسين المرتبطين بالمادة مع فلترة التخصص
    const teachers = await Teacher.find({ subjectId })
      .lean()
      .then((allTeachers) =>
        allTeachers.filter((teacher) => {
          return (
            teacher.accessibleTo === "غير متخصص" ||
            teacher.accessibleTo === division
          );
        })
      );

    // التحقق إذا لم يتم العثور على مدرسين
    if (teachers.length === 0) {
      return res
        .status(404)
        .json({ message: "لا يوجد مدرسين لهذه الماده الان" });
    }

    // إرجاع قائمة المدرسين
    res.status(200).json({ teachers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
//------------------محتوي الماده-------------------------
export const gitSubjectContent = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const allChapters = await Chapter.find({ subjectId })
      .populate("lessons")
      .populate("exam")
      .lean();

    res.status(200).json(allChapters);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// -------------------------------محتوي الدرس---------------------------
export const gitLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
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
};

// -------------------------------عرض الامتحان------------------------------------
export const gitExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await Exam.findById({ _id: examId });
    if (!exam) {
      return res.status(404).json({ message: "هذا الامتحان غير موجوده" });
    }
    res.status(200).json(exam);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};



// حل امتحان الفصل + تصحيحه تلقائيا

export const examAnswer = async (req, res) => {
  const { examId } = req.params;
  const studentId = req.student._id; // تعديل اسم الحقل هنا للتوحيد
  const { answers } = req.body;

  // try {
    // هات الأسئلة الخاصة بالامتحان
    const exam = await Exam.findById({ _id: examId });

    if (!exam) {
      return res.status(404).json({ message: "الامتحان غير موجود" });
    }

    // التحقق من أن الطالب جاوب على الامتحان قبل كده
    const alreadyAnswered = exam.studentAnswers.some(
      (answer) => answer.studentId.toString() === studentId.toString()
    );

    if (alreadyAnswered) {
      return res.status(400).json({ message: "لقد قمت بالإجابة على هذا الامتحان مسبقًا" });
    }

    // تأكد من أن الإجابات تشير إلى أسئلة موجودة
    const formattedAnswers = answers.map((answer) => {
      const question = exam.examQuestions.find(
        (ques) => ques._id.toString() === answer.questionId
      );
      if (!question) {
        return res
          .status(400)
          .json({ message: `السؤال غير موجود` });
      }

      // تصحيح الإجابة هنا بناء على نوع السؤال
      let grade = 0;
      if (question.type === "mcq" && question.correctAnswer === answer.answer) {
        grade = question.grade; 

      } else if (question.type === "essay") {

        console.log("question.correctAnswer:", question.correctAnswer);
        console.log("answer:", answer);
      
        if (question.correctAnswer && answer.answer) {
          const { grade: essayGrade } = correctEssayAnswer(question.correctAnswer, answer.answer, question.grade);
          grade = essayGrade; // استخدم essayGrade هنا
        } else {
          // التعامل مع الحالة عندما تكون القيم غير موجودة
          if (!question.correctAnswer) {
            console.error("correctAnswer is missing");
          }
          if (!answer.answer) {
            console.error("studentAnswer is missing");
          }
        }

      }

      return { questionId: question._id, answer: answer.answer, grade };
    });

    // إضافة إجابات الطالب
    exam.studentAnswers.push({ studentId, answers: formattedAnswers });
    await exam.save();

    return res.status(200).json({ message: "تم حفظ الإجابات مع التصحيح بنجاح" });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "حدث خطأ أثناء حفظ الإجابات",error:error.message });
  // }
};


