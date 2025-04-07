    import express from "express";
    import bodyParser from 'body-parser';
    import cors from 'cors';
    import dotenv from 'dotenv';
    import connectDB from "./DB/connection.js";
    import * as indexRouter from './src/index.router.js';

    dotenv.config();
    console.log("API KEY:", process.env.MAILJET_API_KEY);
    console.log("SECRET:", process.env.MAILJET_SECRET_KEY);
    export const app = express();
    const PORT = process.env.PORT||3000 ;

    app.use(cors());
    app.use(bodyParser.json());
    // home 
    app.get('/', (req, res) => { res.json({ message: 'welcome to our api' }) });
    // api auth
    app.use(`/api/v1/auth/student`, indexRouter.authStudentRouter);
    app.use(`/api/v1/auth/teacher`, indexRouter.authTeacherRouter);
    app.use(`/api/v1/auth/assistant`, indexRouter.authAssistantRouter);
    // api study
    app.use(`/api/v1/study/schoolYear`, indexRouter.schoolYearRouter);
    app.use(`/api/v1/study/lesson`, indexRouter.lessonRouter);
    app.use(`/api/v1/study/chapter`, indexRouter.chapterRouter);
    app.use(`/api/v1/study/subject`, indexRouter.subjectRouter);
    app.use(`/api/v1/study/exam`, indexRouter.examRouter);
    // api display
    app.use(`/api/v1/display/students`, indexRouter.displayStudents);
    app.use(`/api/v1/display/teachers`, indexRouter.displayTeacher);
    app.use(`/api/v1/display/assistants`, indexRouter.displayAssistant);

    connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    export default app;

    