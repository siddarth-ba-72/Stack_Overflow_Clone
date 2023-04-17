import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./connectDatabase.js";
import { errorMiddleWares } from "./middleware/errorMiddleware.js";

const app = express();

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`.red.bold);
  console.log(`Shutting down the server due to Uncaught Exceptions`.red.bold);
  process.exit(1);
});

dotenv.config();
connectDB();

import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/', (req, res) => {
  res.send("This is a stack overflow clone API")
})

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

app.use(errorMiddleWares);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`.bgYellow.black.bold);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`.red.bold);
  console.log(
    `Shutting down the server due to Unhandled Promise Rejection`.red.bold
  );
  server.close(() => {
    process.exit(1);
  });
});