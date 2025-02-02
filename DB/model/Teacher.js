import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true,unique:true },
    email: { type: String, unique: true, required: true },
    profilePicture:{
      type:String
    },
    phone: {
        type: String,
        unique: [true, "هذا الرقم مستخدم من قبل ادخل رقم اخر"],
      },
    password: { type: String, required: true },
    subjectId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true }],
    accessibleTo: { type: String, enum: ["عام", "ازهري", "غير متخصص"], required: true },
    years: [{ type: mongoose.Schema.Types.ObjectId, ref: "SchoolYear" }],
    
   
    
});

export const Teacher= mongoose.model('Teacher', teacherSchema);