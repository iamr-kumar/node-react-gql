import mongoose, { Error } from "mongoose";

export const connectDb = async () => {
  console.log(process.env.MONGODB_URI);
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err: any) {
    console.log(err);
  }
};
