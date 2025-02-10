import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./DB/connection.js";
import * as indexRouter from './src/index.router.js';

dotenv.config();

export const app = express();
const PORT = process.env.PORT||3000 ;
const baseUrl = process.env.BASEURL;

app.use(cors());
app.use(bodyParser.json());
// home 
app.get('/', (req, res) => { res.json({ message: 'welcome to our api' }) });
// api auth
app.use(`${baseUrl}/auth/student`, indexRouter.authStudentRouter);
app.use(`${baseUrl}/auth/teacher`, indexRouter.authTeacherRouter);
app.use(`${baseUrl}/auth/assistant`, indexRouter.authAssistantRouter);
// api study
app.use(`${baseUrl}/study/schoolYear`, indexRouter.schoolYearRouter);
app.use(`${baseUrl}/study/lesson`, indexRouter.lessonRouter);
app.use(`${baseUrl}/study/chapter`, indexRouter.chapterRouter);
app.use(`${baseUrl}/study/subject`, indexRouter.subjectRouter);
app.use(`${baseUrl}/study/exam`, indexRouter.examRouter);
// api display
app.use(`${baseUrl}/display/students`, indexRouter.displayStudents);
app.use(`${baseUrl}/display/teachers`, indexRouter.displayTeacher);
app.use(`${baseUrl}/display/assistants`, indexRouter.displayAssistant);

connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export default app;

 