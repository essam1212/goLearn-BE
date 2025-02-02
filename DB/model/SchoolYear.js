import mongoose from "mongoose";

const schoolYearSchema = new mongoose.Schema({
  year: { type: String, required: true },
    subjectIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject", }],


},{timestamps:true});

export const  SchoolYear= mongoose.model('SchoolYear', schoolYearSchema);
