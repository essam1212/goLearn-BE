import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SchoolYear } from "../../../DB/model/SchoolYear.js";
import { Student } from "../../../DB/model/Student.js";
import { sendEmail } from "../../utils/emailService.js";

export const signup = async (req, res) => {
  const { name, email, phone, fatherPhone, password, year, division, section } =
    req.body;
    const profilePicture = req.files?.profilePicture.path || null;

  try {
    const schoolYear = await SchoolYear.findOne({ year });
    if (!schoolYear) {
      res.status(404).json({ message: "the school year is not found" });
    }

    if (phone === fatherPhone) {
      res
        .status(404)
        .json({ message: "your phone Not equal your parent Phone" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newStudent = new Student({
        name,
        email,
        phone,
        fatherPhone,
        year: schoolYear._id,
        password: hashedPassword,
        isVerified: false,
        division,
        section,
        profilePicture
      });
      await newStudent.save();
      const token = jwt.sign({ id: newStudent._id }, process.env.emailToken, {
        expiresIn: "1d",
      });
      const verificationLink = `${req.protocol}://${req.headers.host}${process.env.baseUrl}/auth/verify-email/${token}`;
      await sendEmail(email, "تأكيد الحساب", verificationLink);
      res.status(201).json({
        message:
          "تم انشاء الحساب بنجاح برجاء الذهاب الي بريدك الالكتروني لتاكيد الحساب ",
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error creating student", err });
  }
};

// ------------------------------------------------------------------------
export const confirmEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.emailToken);
    const student = await Student.findById(decoded.id);

    if (!student) {
      return res.status(404).json({ message: "هذا الطالب غير موجود" });
    }
    student.isVerified = true;
    await student.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
};

// ---------------------------------------------------------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "هذا الحساب ليس موجود " });
    }

    // التحقق من تأكيد البريد الإلكتروني
    if (!student.isVerified) {
      return res
        .status(400)
        .json({ message: "برجاء الذهاب الي بريدك الالكتروني " });
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "كلمه المرور خاطئه" });
    }
    const token = jwt.sign({ id: student._id }, process.env.tokenSignature, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

// ======================================================
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: " هذا الحساب غير موجود" });
    } else {
      const token = jwt.sign(
        { id: student._id },
        process.env.passwordSecretKey,
        {
          expiresIn: "1h",
        }
      );
      const resetLink = `${req.protocol}://${req.headers.host}${process.env.baseUrl}/auth/student/reset-password/${token}`;
      console.log("Reset Password Link:", resetLink);
      res.status(200).json({ message: "Reset password link sent to email." });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
// -------------------------------------------------
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    // فك شفرة التوكن للتحقق من صحته
    const decoded = jwt.verify(token, process.env.passwordSecretKey);
    const student = await Student.findById(decoded.id);

    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    // تعيين كلمة المرور الجديدة بعد التشفير
    student.password = await bcrypt.hash(newPassword, 10);
    await student.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
};
// -------------------------------------------------

export const updateProfile = async (req, res) => {
  const { name, phone, fatherPhone, year  } = req.body;
  const profilePicture = req.files?.profilePicture.path || null;

  try {
    const student = await Student.findById(req.student.id); // تأكد من أنك تستخدم Middleware للتحقق من التوكن
    const schoolYear = await SchoolYear.findOne({ year });
    if (!schoolYear) {
      res.status(404).json({ message: "the school year is not found" });
    }
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    const yearId = schoolYear._id;
    
    
    await Student.findByIdAndUpdate(req.student.id, {
      name,
      phone,
      fatherPhone,
      year:yearId,
      profilePicture
      
    });
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

// =================================================================
export const deleteProfile = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.student.id);

    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting account" });
  }
};
