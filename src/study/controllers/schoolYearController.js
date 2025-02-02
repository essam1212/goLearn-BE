import { SchoolYear } from "../../../DB/model/SchoolYear.js";
import { Subject } from "../../../DB/model/Subject.js";
import { update } from "../validations/chapterValidation.js";

export const addYear = async (req, res) => {
  try {
    const { year, subjects } = req.body;

    // التحقق من وجود السنة واسم المواد
    if (!year || !subjects || !Array.isArray(subjects)) {
      return res.status(400).json({
        message: "اسم السنه والمواد الدراسيه مطلوبه",
      });
    }

    // البحث عن المواد من خلال أسمائها
    const foundSubjects = await Subject.find({ name: { $in: subjects } });

    // التأكد من أن كل المواد المدخلة موجودة
    const foundSubjectNames = foundSubjects.map((subject) => subject.name);
    const notFound = subjects.filter(
      (subject) => !foundSubjectNames.includes(subject)
    );

    if (notFound.length > 0) {
      return res.status(404).json({
        message: `The following subjects were not found: ${notFound.join(",")}`,
      });
    }

    // الحصول على IDs المواد
    const subjectIds = foundSubjects.map((subject) => subject._id);

    // إنشاء السنة الدراسية
    const newYear = new SchoolYear({ year, subjectIds });
    await newYear.save();

    return res.status(201).json({
      message: "Year created successfully.",
      year: newYear,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
// =================================================
export const updateYear = async (req, res) => {
  const { subjects,year } = req.body;
  const { id } = req.params;

  const findYear = await SchoolYear.findById(id);
  if (!findYear) {
    res.status(404).json({ message: "هذه السنه الدراسيه غير موجوده" });
  }
  
  if (subjects) {
    // البحث عن المواد من خلال أسمائها
    const foundSubjects = await Subject.find({ name: { $in: subjects } });

    // التأكد من أن كل المواد المدخلة موجودة
    const foundSubjectNames = foundSubjects.map((subject) => subject.name);
    const notFound = subjects.filter(
      (subject) => !foundSubjectNames.includes(subject)
    );

    if (notFound.length > 0) {
      return res.status(404).json({
        message: `The following subjects were not found: ${notFound.join(",")}`,
      });
    }
    findYear.subjectIds=foundSubjects.map((subject) => subject._id);
  }
  if (year) {
    findYear.year=year
  }
  const newYear=await SchoolYear.findByIdAndUpdate(id,findYear,{new:true})
  return res.status(201).json({
    message: "Year updated successfully.",
    year: newYear,
  });
};
