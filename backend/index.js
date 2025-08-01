import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import courseRoutes from "./routes/courseRoutes.js";

const app = express();
const port = 4000;

dotenv.config();

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api", courseRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
