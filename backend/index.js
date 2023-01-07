import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import itemRoute from "./routes/itemRoute.js";
import userRoute from "./routes/userRoute.js";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();
let port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
  })
);

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.use("/api/auth", authRoute);
app.use("/api/item", itemRoute);
app.use("/api/users", userRoute);
app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  connect();
  console.log("Server is running on port " + port);
});
