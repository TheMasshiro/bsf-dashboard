import mongoose from "mongoose";

const pupaSchema = new mongoose.Schema(
  {
    pupaId: { type: String, require: true },
    pupaTemperature: { type: Number, require: true },
    pupaHumidity: { type: Number, require: true },
    pupaMoisture: { type: Number, require: true },
    pupaLight: { type: Number, require: true },
    pupaAmmonia: { type: Number, require: true },
  },
  { timestamps: true },
);

const Pupa = mongoose.model("Pupa", pupaSchema);

export default Pupa;
