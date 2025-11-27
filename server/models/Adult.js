import mongoose from "mongoose";

const adultSchema = new mongoose.Schema(
  {
    adultId: { type: String, require: true },
    adultTemperature: { type: Number, require: true },
    adultHumidity: { type: Number, require: true },
    adultMoisture: { type: Number, require: true },
    adultLight: { type: Number, require: true },
    adultAmmonia: { type: Number, require: true },
  },
  { timestamps: true },
);

const Adult = mongoose.model("Adult", adultSchema);

export default Adult;
