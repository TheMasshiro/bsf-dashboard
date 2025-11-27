import mongoose from "mongoose";

const adultSchema = new mongoose.Schema(
  {
    adultId: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

const Adult = mongoose.model("Adult", adultSchema);

export default Adult;
