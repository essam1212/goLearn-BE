import mongoose from "mongoose";

const assistantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: {
    type: String,
    unique: [true, "هذا الرقم مستخدم من قبل ادخل رقم اخر"],
  },
  password: { type: String, required: true },
  teachersId:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },]
});

export const Assistant = mongoose.model("Assistant", assistantSchema);
