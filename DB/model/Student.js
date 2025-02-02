import mongoose, { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    name: { type: String, required: true, unique:true},
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    year: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolYear",
      required: true,
    },
    profilePicture:{
      type:String
    },
    division: { type: String, enum: ["عام", "ازهري"], required: true },
    section: { type: String, enum: ["علمي", "ادبي",] }, 

    phone: { 
      type: String,
      unique: [true, "هذا الرقم مستخدم من قبل ادخل رقم اخر"],
    },
    fatherPhone: {
      type: String,
      unique: [true, "هذا الرقم مستخدم من قبل ادخل رقم اخر"],
    },
   

    isVerified: { type: Boolean, default: false }, // حالة تأكيد البريد الإلكتروني
 
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Student", studentSchema);

