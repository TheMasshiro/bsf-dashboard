import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    eggSensors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Egg",
      },
    ],
    larvaSensors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Larva",
      },
    ],
    pupaSensors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pupa",
      },
    ],
    adultSensors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Adult",
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
