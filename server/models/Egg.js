import mongoose from "mongoose";

const eggSchema = new mongoose.Schema(
  {
    eggId: { type: String, require: true },
    eggTemperature: { type: Number, require: true },
    eggHumidity: { type: Number, require: true },
    eggMoisture: { type: Number, require: true },
    eggLight: { type: Number, require: true },
    eggAmmonia: { type: Number, require: true },
  },
  { timestamps: true },
);

const Egg = mongoose.model("Egg", eggSchema);

export default Egg;
