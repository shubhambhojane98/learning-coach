import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
const port = 4000;

// Middleware
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`);
});
