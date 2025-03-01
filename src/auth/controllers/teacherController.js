import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Teacher } from "../../../DB/model/Teacher.js";
import { Subject } from "../../../DB/model/Subject.js";
import { SchoolYear } from "../../../DB/model/SchoolYear.js";

export const signup = async (req, res) => {
  const { name, email, phone, password, accessibleTo, subjectName, years } =
    req.body;
  // try {
    if (!years || !Array.isArray(years)) {
      return res.status(400).json({
        message: "اسم السنين الدراسيه مطلوب",
      });
    }

    const yearsData = await SchoolYear.find({ year: { $in: years } });
    const foundYears = yearsData.map((yearTitle) => yearTitle.year);
    const notFound = foundYears.filter(
      (yearTitle) => !foundYears.includes(yearTitle)
    );
    if (notFound.length > 0) {
      return res.status(404).json({
        message: `The following years were not found: ${notFound.join(",")}`,
      });
    }
    const yearsId=yearsData.map((year)=>year._id)

    const hashedPassword = await bcrypt.hash(password, 10);
    const subject = await Subject.find({ name: { $in: subjectName } });
    const newTeacher = new Teacher({
      name,
      email,
      phone,
      password: hashedPassword,
      subjectId: subject._id,
      accessibleTo,
      years:yearsId
    });
    await newTeacher.save();

    await Subject.findOneAndUpdate( 
      { name: subjectName },
      { $push: { teachers: newTeacher._id } }
    );

    res.status(201).json({ message: "تم انشاء الحساب بنجاح " });
  // } catch (err) {
  //   res.status(500).json({ message: "Error creating teacher", err });
  // }
};

// ---------------------------------------------------------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(404).json({ message: "هذا الحساب ليس موجود " });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: "كلمه المرور خاطئه" });
    }
    const token = jwt.sign({ id: teacher._id }, process.env.tokenSignature, {
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
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: " هذا الحساب غير موجود" });
    } else {
      const token = jwt.sign(
        { id: teacher._id },
        process.env.passwordSecretKey,
        {
          expiresIn: "1h",
        }
      );
      const resetLink = `${req.protocol}://${req.headers.host}${process.env.baseUrl}/auth/teacher/reset-password/${token}`;
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
    const teacher = await Teacher.findById(decoded.id);

    if (!teacher) {
      return res.status(404).json({ message: "User not found" });
    }

    // تعيين كلمة المرور الجديدة بعد التشفير
    teacher.password = await bcrypt.hash(newPassword, 10);
    await teacher.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
};
// -------------------------------------------------

export const updateProfile = async (req, res) => {
  const { name, phone } = req.body;
  // try {
  const teacher = await Teacher.findById(req.teacher.id); // تأكد من أنك تستخدم Middleware للتحقق من التوكن

  if (!teacher) {
    return res.status(404).json({ message: "User not found" });
  }

  await Teacher.findByIdAndUpdate(teacher._id, { name, phone });

  res.status(200).json({ message: "Profile updated successfully" });
  // } catch (err) {
  //   res.status(500).json({ message: "Error updating profile" });
  // }
};

// =================================================================
export const deleteProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.teacher.id);

    if (!teacher) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting account" });
  }
};
