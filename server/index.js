require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const router = require("./routers");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middlewares/error-middleware");

const initializeData = require("./db/index");

const PORT = process.env.PORT || 9375;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(morgan("dev"));
app.use(express.static("img"));
app.use(fileUpload({ createParentPath: true }));
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    initializeData();
    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT =  ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
