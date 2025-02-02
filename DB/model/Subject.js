import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({

    name: { type: String, required: true },
    section: { type: String, enum: ["علمي", "ادبي"] },
    availableFor: { type: String, enum: ["عام", "ازهري", "كيلاهما"], required: true },
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
}, {
  timestamps: true,
});

export const Subject = mongoose.model('Subject', subjectSchema);
