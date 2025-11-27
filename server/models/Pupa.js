import mongoose from "mongoose";

const pupaSchema = new mongoose.Schema(
  {
    pupaId: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

const Pupa = mongoose.model("Pupa", pupaSchema);

export default Pupa;
