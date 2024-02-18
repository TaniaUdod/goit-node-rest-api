import express from "express";
import morgan from "morgan";
import cors from "cors";

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join("config", ".env") });

import usersRouter from "./routes/usersRouter.js";
import contactsRouter from "./routes/contactsRouter.js";
import { connectDB } from "./config/connectDB.js";

export const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { PORT } = process.env;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
