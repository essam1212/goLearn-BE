import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Assistant } from "../../../DB/model/Assistant.js";
import { Teacher } from "../../../DB/model/Teacher.js";
export const signup = async (req, res) => {
  const { name, email, phone, password, teacherNames } = req.body;
  try {
    const teachers = await Teacher.find({ name: { $in: teacherNames } });
    if (teachers.length !== teacherNames.length) {
      return res.status(400).json({
        message: 'بعض أسماء المدرسين غير موجودة',
      });
    }
    // استخراج معرفات المدرسين
  const teachersId = teachers.map((teacher) => teacher._id);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAssistant = new Assistant({
      name,
      email,
      phone,
      password: hashedPassword,
      teachersId
    });    
    await newAssistant.save();

    res.status(201).json({ message: "تم انشاء الحساب بنجاح " });
  } catch (err) {
    res.status(500).json({ message: "Error creating student", err });
  }
};

// ---------------------------------------------------------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const assistant = await Assistant.findOne({ email });

    if (!assistant) {
      return res.status(404).json({ message: "هذا الحساب ليس موجود " });
    }

    const isMatch = await bcrypt.compare(password, assistant.password);
    if (!isMatch) {
      return res.status(400).json({ message: "كلمه المرور خاطئه" });
    }
    const token = jwt.sign({ id: assistant._id }, process.env.tokenSignature, {
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
    const assistant = await Assistant.findOne({ email });
    if (!assistant) {
      return res.status(404).json({ message: " هذا الحساب غير موجود" });
    } else {
      const token = jwt.sign(
        { id: assistant._id },
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
    const assistant = await Assistant.findById(decoded.id);

    if (!assistant) {
      return res.status(404).json({ message: "User not found" });
    }

    // تعيين كلمة المرور الجديدة بعد التشفير
    assistant.password = await bcrypt.hash(newPassword, 10);
    await assistant.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
};
// -------------------------------------------------

export const updateProfile = async (req, res) => {
  const { name, phone } = req.body;
  try {
    const assistant = await Assistant.findById(req.assistant.id); // تأكد من أنك تستخدم Middleware للتحقق من التوكن

    if (!assistant) {
      return res.status(404).json({ message: "User not found" });
    }

    await Assistant.findByIdAndUpdate(req.assistant.id,{name, phone});
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

// =================================================================
export const deleteProfile = async (req, res) => {
  try {
    const assistant = await Assistant.findByIdAndDelete(req.assistant.id);

    if (!assistant) {
      return res.status(404).json({ message: "User not found" }); 
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting account" });
  }
};
