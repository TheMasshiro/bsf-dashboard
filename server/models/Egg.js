import mongoose from "mongoose";

const eggSchema = new mongoose.Schema(
  {
    eggId: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

const Egg = mongoose.model("Egg", eggSchema);

export default Egg;
