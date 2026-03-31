import mongoose from "mongoose";
import { exit } from "process";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);

    console.log("Đã kết nối với Database mongodb");
  } catch (error) {
    console.error("lỗi gòi", error);
    process(exit(1));
  }
};
