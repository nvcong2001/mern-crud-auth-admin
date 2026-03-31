import express from "express";
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//IMPORT ROUTE
import categoriesRoute from "./routes/categoriesRouters.js";
import authRoute from "./routes/authRouters.js";
import userRoute from "./routes/userRouters.js";

//IMPORT MIDDLEWARE
import { protectedRoute } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//midleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL, // frontend
    credentials: true,
  }),
);

//PUBLIC ROUTES
app.use("/api/auth", authRoute);
app.use("/api/categories", categoriesRoute);

//PRIVATE ROUTES
app.use(protectedRoute);
app.use("/api/users", userRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
  });
});
