import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
  });
  
  export const AccessCode  = mongoose.model('code', codeSchema);