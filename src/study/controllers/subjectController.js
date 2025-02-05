import { SchoolYear } from "../../../DB/model/SchoolYear.js";
import { Subject } from "../../../DB/model/Subject.js";
import { Teacher } from "../../../DB/model/Teacher.js";

// Function to create a new subject
export const createSubject = async (req, res) => {
  // try {
  const { name, section, availableFor } = req.body;

  // التحقق من أن التخصص صحيح
  const validAvailableFor = ["عام", "ازهري", "كيلاهما"];
  if (!validAvailableFor.includes(availableFor)) {
    return res.status(400).json({ message: "Invalid availableFor provided." });
  }

  // التحقق من عدم تكرار المادة
  const existingSubject = await Subject.findOne({ name });
  if (existingSubject) {
    return res
      .status(400)
      .json({ message: "Subject with this name already exists." });
  }
 



  // إنشاء المادة
  const subject = new Subject({
    name,
    section,
    availableFor,
    });

  await subject.save();

  res.status(201).json({ message: "Subject created successfully.", subject });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Internal server error.',error:error.message });
  // }
};
  