import mongoose from "mongoose";

const larvaSchema = new mongoose.Schema(
  {
    larvaId: { type: String, require: true },
    larvaTemperature: { type: Number, require: true },
    larvaHumidity: { type: Number, require: true },
    larvaMoisture: { type: Number, require: true },
    larvaLight: { type: Number, require: true },
    larvaAmmonia: { type: Number, require: true },
  },
  { timestamps: true },
);

const Larva = mongoose.model("Larva", larvaSchema);

export default Larva;
