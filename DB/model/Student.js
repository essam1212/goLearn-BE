import mongoose, { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    name: { type: String, required: true,unique:true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    year: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolYear",
      required: true,
    },
    profilePicture:{
      type:String
    },
    stage: {
      type: String,
      enum: ["اعدادي", "ثانوي"],
      required: true,
    },
    educationType: { type: String, enum: ["عام", "ازهر"], required: true },
    section:  {
      type: String,
      enum: ["علمي", "ادبي", "علمي علوم", "علمي رياضة"],
      required: function () {
        return this.stage === "ثانوي"; // التخصص مطلوب فقط للمرحلة الثانوية
      },
    } ,
    phone: { 
      type: String,
      required  : true,
      unique: true,
    },
    fatherPhone: {
      type: String,
      required: true,
      unique: true,
    },
    city: { type: String, required: true },
    address: { type: String, required: true },
   

    isVerified: { type: Boolean, default: false }, // حالة تأكيد البريد الإلكتروني
 
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Student", studentSchema);

