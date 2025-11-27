import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("Connected", () =>
    console.log("Database Established"),
  );
  await mongoose.connect(`${process.env.MONGODB_URI}`);
};

export default connectDB;
