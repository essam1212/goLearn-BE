import jwt from "jsonwebtoken";
import { Student } from "../../DB/model/Student.js";
import { Teacher } from "../../DB/model/Teacher.js";
import { Assistant } from "../../DB/model/Assistant.js";
export const roles = {
  student: "student",
  teacher: "teacher",
  assistant: "assistant",
};

// ========================auth student ============================
export const studentAccess = (acceptRoles = roles.student) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;


    try {
      if (!authorization?.startsWith(process.env.BearerKey)) {
        res.status(401).json({ message: "In-valid Bearer key" });
      } else {
        const token = authorization.split(process.env.BearerKey)[1];

        if (!token) {
          return res
            .status(401)
            .json({ message: "No token, authorization denied" });
        }
        const decoded = jwt.verify(token, process.env.tokenSignature);
        req.student = decoded;

        const student = await Student.findById(req.student.id).select(
          "email name phone fatherPhone year section division"
        );
        if (!student) {
          return res.status(404).json({ message: "student not found" });
        }

        if (acceptRoles.includes(roles.student)) {
          req.student = student;
          
          
          next();
        } else {
          next(
            res.status(404).json({ message: "هذا ليس من صلحيات هذا الحساب" })
          );
        }
      }
    } catch (err) {
      res.status(401).json({ message: "Invalid token", err });
    }
  };
};
// ===================auth teacher==================================
export const teacherAccess = (acceptRoles = roles.teacher) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;

    try {
      if (!authorization?.startsWith(process.env.BearerKey)) {
        res.status(401).json({ message: "In-valid Bearer key" });
      } else {
        const token = authorization.split(process.env.BearerKey)[1];

        if (!token) {
          return res
            .status(401)
            .json({ message: "No token, authorization denied" });
        }
        const decoded = jwt.verify(token, process.env.tokenSignature);
        req.teacher = decoded;

        const teacher = await Teacher.findById(req.teacher.id).select(
          "email name"
        );
        if (!teacher) {
          return res.status(404).json({ message: "teacher not found" });
        }

        if (acceptRoles.includes(roles.teacher)) {
          req.teacher = teacher;
          next();
        } else {
          next(
            res.status(404).json({ message: "هذا ليس من صلاحيات هذا الحساب" })
          );
        }
      }
    } catch (err) {
      res.status(401).json({ message: "Invalid token", err });
    }
  };
};

// ===================auth assistant==================================
export const assistantAccess = (acceptRoles = roles.assistant) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;

    try {
      if (!authorization?.startsWith(process.env.BearerKey)) {
        res.status(401).json({ message: "In-valid Bearer key" });
      } else {
        const token = authorization.split(process.env.BearerKey)[1];

        if (!token) {
          return res
            .status(401)
            .json({ message: "No token, authorization denied" });
        }
        const decoded = jwt.verify(token, process.env.tokenSignature);
        req.assistant = decoded;

        const assistant = await Assistant.findById(req.assistant.id).select(
          "email name"
        );
        if (!assistant) {
          return res.status(404).json({ message: "User not found" });
        }

        if (acceptRoles.includes(roles.assistant)) {
          req.assistant = assistant;
          next();
        } else {
          next(
            res.status(404).json({ message: "هذا ليس من صلاحيات هذا الحساب" })
          );
        }
      }
    } catch (err) {
      res.status(401).json({ message: "Invalid token", err });
    }
  };
};
