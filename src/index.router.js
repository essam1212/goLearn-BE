import authStudentRouter from "./auth/routers/studentRoutes.js";
import authTeacherRouter from "./auth/routers/teacherRoutes.js";
import authAssistantRouter from "./auth/routers/assistantRoutes.js";
import schoolYearRouter from "./study/routes/schoolYearRoutes.js";
import chapterRouter from "./study/routes/chapterRoutes.js";
import subjectRouter from "./study/routes/subjectRoutes.js";
import lessonRouter from "./study/routes/lessonRoutes.js";
import examRouter from "./study/routes/examRoutes.js";
import displayStudents from "./display/students/displayStudentsRoutes.js";
import displayTeacher from "./display/teachers/displayTeacherRoutes.js";
import displayAssistant from "./display/assistant/displayAssistantRoutes.js";

export {
  // auth
  authStudentRouter,
  authTeacherRouter,
  authAssistantRouter,
  // study
  schoolYearRouter,
  chapterRouter,
  subjectRouter,
  lessonRouter,
  examRouter,
  // display
  displayStudents,
  displayTeacher,
  displayAssistant
};
