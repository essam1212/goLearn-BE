import { Chapter } from "../../../DB/model/Chapter.js";
import { Exam } from "../../../DB/model/Exam.js";
import { SchoolYear } from "../../../DB/model/SchoolYear.js";
import { Subject } from "../../../DB/model/Subject.js";

export const addChapter = async (req, res) => {
  const { year, subjectName, title } = req.body;
  try {
    const teacherId = req.teacher.id;
    const schoolYear = await SchoolYear.findOne({ year });

    if (!schoolYear) {
      return res.status(404).json({ message: "هذه السنه الدراسيه غير موجوده" });
    }
    const subject = await Subject.findOne({ name: subjectName });

    if (!subject) {
      return res.status(404).json({ message: "هذه الماده غير موجوده" });
    }

    const isSubjectInGradeLevel = schoolYear.subjectIds.includes(subject._id);
    if (!isSubjectInGradeLevel) {
      return res.status(400).json({
        message:
          "هذه السنه الدراسيه لا تحتوي علي هذه الماده",
      });
    }

    const newChapter = new Chapter({
      SchoolYearId: schoolYear._id,
      subjectId: subject._id,
      title,
      teacherId,
    });

    await newChapter.save();
    res
      .status(201)
      .json({ message: "Chapter added successfully", chapter: newChapter });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add chapter", error: err.message });
  }
};
// ==========================================


export const updateChapter = async (req, res) => {
  const { year, subjectName, title } = req.body;
  const { id } = req.params; 
  // try {
    const chapter = await Chapter.findById(id);

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found." }); 
    }
    if (year) {
      const schoolYear = await SchoolYear.findOne({ year });
      if (!schoolYear) {
        return res.status(404).json({ message: "School year not found." });
      }
      chapter.SchoolYearId = schoolYear._id; // ربط السنة الجديدة
    }

    if (subjectName) {
      const subject = await Subject.findOne({ name: subjectName });
      if (!subject) {
        return res.status(404).json({ message: "Subject not found." });
      }
      chapter.subjectId = subject._id; // ربط المادة الجديدة
    }

    // تحديث العنوان
    if (title) {
      chapter.title = title; // تعديل العنوان
    }

    // حفظ التعديلات
    const updatedChapter = await Chapter.findByIdAndUpdate(id,chapter,{new:true});

    return res.status(200).json({
      message: "Chapter updated successfully.",
      updatedChapter,
    });

  // } catch (err) {
  //   res
  //     .status(500)
  //     .json({ message: "Failed to update chapter", error: err.message });
  // }
};
// ==========================================
export const deleteChapter = async (req, res) => {
  const { id } = req.params;
  try {
    const findChap = await Chapter.findById(id);
    if (!findChap) {
      res.status(500).json({ message: "هذا الفصل غير موجود" });
    }

    await Chapter.findByIdAndDelete(id);

    res.status(201).json({ message: "Chapter deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete chapter", error: err.message });
  }
};
