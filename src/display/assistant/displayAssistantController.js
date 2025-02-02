import { Assistant } from "../../../DB/model/Assistant.js";
import { Student } from "../../../DB/model/Student.js";
import { Teacher } from "../../../DB/model/Teacher.js";
import { Chapter } from "../../../DB/model/Chapter.js";
import { Exam } from "../../../DB/model/Exam.js";
import { Lesson } from "../../../DB/model/Lesson.js";

// عرض المدرسن اللي المساعد شغال معاهم
export const getTeachers = async (req, res) => {
  const { id } = req.assistant;
  try {
    const assistant = await Assistant.findById(id).populate(
      "teachersId",
      "name profilePicture"
    );
    if (!assistant) {
      return res.status(404).json({ message: "Assistant not found" });
    }
    res.json({ teachers: assistant.teachersId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// عرض السنين الدراسية المرتبطة بمدرس معين

export const getSchoolYears = async (req, res) => {
  const { teacherId } = req.params;
  try {
    const teacher = await Teacher.findById({ _id: teacherId }).populate(
      "years",
      "year"
    );
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({ schoolYears: teacher.years });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// 4. عرض الفصول والدروس المرتبطة بالسنة والمواد
export const getLessonExams=async(req,res)=>{
  const {yearId}=req.params
  const chapters = await Chapter.find({ SchoolYearId: yearId }).select("title")
  .populate('lessons', 'title')
  .populate('exam', 'title');
  if (!chapters.length) {
    return res.status(404).json({ message: 'No chapters found for this year' });
  }
  res.json({ chapters });

}
// ===========================exam=============================
// عرض قائمه الطلاب في حاله الامتحانات الشامله
export const getExamAllStudents=async(req,res)=>{
  try {

  const{examId}=req.params
  const exam=await Exam.findById({_id:examId})
  if (!exam) {
    return res.status(404).json({ message: 'Exam not found' });
  }
  const students = exam.studentAnswers.map((answer) => answer.studentId);
  const studentDetails =await Student.find({_id:{$in:students}}).select('name email phone fatherPhone')
  res.json({ examTitle: exam.title, students: studentDetails });
} catch (error) {
  res.status(500).json({ message: 'Server error', error: error.message });
}
}

// عرض اجابه الطالب 

export const getExamAnswer=async(req,res)=>{
  const { examId, studentId } = req.params;
  try{
    // التأكد من وجود الامتحان
    const exam = await Exam.findById({_id:examId});
    if (!exam) {
      return res.status(404).json({ message: 'الامتحان غير موجود' });
    }
    const studentAnswer = exam.studentAnswers.find((sa)=>sa.studentId.toString()===studentId)
    if (!studentAnswer) {
      return res.status(404).json({ message: 'هذا الطالب لم يجيب علي هذا الامتحان' });
    }
    // تجهيز اجابه الطالب والاجابه الصحيحه
    const answersWithCorrect = exam.examQuestions.map((question) => {
      const studentAnswerObj = studentAnswer.answers.find(
        (ans) => ans.questionId.toString() === question._id.toString()
      );      return {
        questionText: question.questionText,
        correctAnswer: question.correctAnswer,
        studentAnswer: studentAnswerObj ? studentAnswerObj.answer : null,
      };
    });
    res.json({
      examTitle: exam.title,
      answers: answersWithCorrect,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}


// تصحيح اجابات الطالب
export const grateExamAnswer=async(req,res)=>{
  const { examId, studentId } = req.params;
  const { answers } = req.body;
  try{
  // التاكد من وجود الامتحان
  const exam = await Exam.findById({_id:examId});
  if (!exam) {
    return res.status(404).json({ message: 'الامتحان غير موجود' });
  }
  // جلب اجابات الطالب 
  const studentAnswer = exam.studentAnswers.find(
    (sa) => sa.studentId.toString() === studentId
  );

  if (!studentAnswer) {
    return res.status(404).json({ message: 'هذا الطالب لم يحل هذا الامتحان' });
  }
  const formattedAnswers = answers.map((answer) => {
    const question = exam.examQuestions.find(
      (ques) => ques._id.toString() === answer.questionId
    );
    if (!question) {
      return res
        .status(400)
        .json({ message: `السؤال غير موجود` });
    }
    return { questionId: question._id, grade: answer.grade };
  });
  exam.studentAnswers.push({ studentId, answers: formattedAnswers });

  await exam.save();
  res.status(201).json({ message: 'Grades updated successfully' });
} catch (error) {
  res.status(500).json({ message: 'Server error', error: error.message });
}
}
// ===========================lesson=============================
// عرض قائمه الطلاب في حاله امتحانات الحصص 
export const getLessonAllStudents=async(req,res)=>{
  try {

  const{lessonId}=req.params
  const lesson=await Lesson.findById({_id:lessonId})
  if (!lesson) {
    return res.status(404).json({ message: 'Exam not found' });
  }
  const students = lesson.studentAnswers.map((answer) => answer.studentId);
  const studentDetails =await Student.find({_id:{$in:students}}).select('name email phone fatherPhone')
  res.json({ examTitle: lesson.title, students: studentDetails });
} catch (error) {
  res.status(500).json({ message: 'Server error', error: error.message });
}
}

// عرض اجابه الطالب 

export const getLessonAnswer=async(req,res)=>{
  const { lessonId, studentId } = req.params;
  try{
    // التأكد من وجود الامتحان
    const lesson = await Lesson.findById({_id:lessonId});
    if (!lesson) {
      return res.status(404).json({ message: 'الامتحان غير موجود' });
    }
    const studentAnswer = lesson.studentAnswers.find((sa)=>sa.studentId.toString()===studentId)
    if (!studentAnswer) {
      return res.status(404).json({ message: 'هذا الطالب لم يجيب علي هذا الامتحان' });
    }
    // تجهيز اجابه الطالب والاجابه الصحيحه
    const answersWithCorrect = lesson.examQuestions.map((question) => {
      const studentAnswerObj = studentAnswer.answers.find(
        (ans) => ans.questionId.toString() === question._id.toString()
      );      return {
        questionText: question.questionText,
        correctAnswer: question.correctAnswer,
        studentAnswer: studentAnswerObj ? studentAnswerObj.answer : null,
      };
    });
    res.json({
      examTitle: lesson.title,
      answers: answersWithCorrect,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}


// تصحيح اجابات الطالب
export const grateLessonAnswer=async(req,res)=>{
  const { lessonId, studentId } = req.params;
  const { grades } = req.body;
  try{
  // التاكد من وجود الامتحان
  const lesson = await Lesson.findById({id:lessonId});
  if (!lesson) {
    return res.status(404).json({ message: 'الامتحان غير موجود' });
  }
  // جلب اجابات الطالب 
  const studentAnswer = lesson.studentAnswers.find(
    (sa) => sa.studentId.toString() === studentId
  );

  if (!studentAnswer) {
    return res.status(404).json({ message: 'هذا الطالب لم يجيب علي هذا الاختبار' });
  }
  grades.forEach(({grade})=>{
    const answer = studentAnswer.answers.find(
      (ans) => ans.answer
    );
    if (answer) {
      answer.grade = grade; // تحديث الدرجة
    }
  })
  await lesson.save();
  res.status(201).json({ message: 'تم تصحيح الامتحان' });
} catch (error) {
  res.status(500).json({ message: 'Server error', error: error.message });
}
}















// عرض الطلاب المرتبطين بسنة دراسية معينة
// export const getStudents=async(req,res)=>{
//     try {
//         const {yearId} = req.params;
    
//         // جلب الطلاب المرتبطين بالسنة الدراسية
//         const students = await Student.find({year: yearId }).select('name phone fatherPhone').lean();
    
//         if (!students.length) {
//           return res.status(404).json({ message: 'No students found for this year' });
//         }
    
//         // إضافة بيانات الحصص والامتحانات لكل طالب
//         const detailedStudents = await Promise.all(
//           students.map(async (student) => {
//             // حصص الطالب
//             const lessonsAttended = await Lesson.find({
//               'studentAnswers.studentId': student._id,
//             }).select('title');
    
//             // درجات الطالب في امتحان الحصص
//             const lessonGrades = await Lesson.find({
//               'studentAnswers.studentId': student._id,
//             }).select('title studentAnswers.studentId studentAnswers.answers');
    
//             // درجات الطالب في الامتحانات الشاملة
//             const examGrades = await Exam.find({
//               'studentAnswers.studentId': student._id,
//             }).select('title studentAnswers.studentId studentAnswers.answers');
    
//             return {
//               ...student,
//               lessonsAttended: lessonsAttended.map((lesson) => lesson.title), // أسماء الحصص
//               lessonGrades: lessonGrades.map((lesson) => ({
//                 lessonTitle: lesson.title,
//                 answers: lesson.studentAnswers.find(
//                   (sa) => sa.studentId.toString() === student._id.toString()
//                 )?.answers || [],
//               })),
//               examGrades: examGrades.map((exam) => ({
//                 examTitle: exam.title,
//                 answers: exam.studentAnswers.find(
//                   (sa) => sa.studentId.toString() === student._id.toString()
//                 )?.answers || [],
//               })),
//             };
//           })
//         );
    
//         res.json({ students: detailedStudents });
//       } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//       }
       
// }

