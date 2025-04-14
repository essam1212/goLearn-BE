import multer from "multer";

const storage = multer.memoryStorage(); // ✅ بنخزن في الذاكرة مش على الهارد

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed.")
    );
  }
};

export const upload = multer({ storage, fileFilter });
