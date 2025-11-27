import mongoose from "mongoose";

const larvaSchema = new mongoose.Schema(
  {
    larvaId: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

const Larva = mongoose.model("Larva", larvaSchema);

export default Larva;
