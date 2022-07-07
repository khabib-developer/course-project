import "dotenv/config";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import { sequelize } from "./database/index";

import * as userRouter from "./routes/user.routes";
import * as fileRouter from "./routes/file.routes";
import * as collectionRouter from "./routes/collection.routes";

import errorMiddleware from "./middleware/error.middleware";

const app: Application = express();

const PORT = process.env.PORT;

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/static", express.static(path.resolve(__dirname, "..", "static")));

app.use("/auth", userRouter.default);
app.use("/file", fileRouter.default);
app.use("/collection", collectionRouter.default);

app.use(errorMiddleware);

const start = async () => {
  try {
    // await sequelize.sync();

    await sequelize.authenticate();

    if (process.env.NODE_ENV === "production") {
      app.use("/", express.static(path.join(__dirname, "client", "build")));
      app.use("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
      });
    }

    app.listen(PORT, () => console.log(`app has been ported on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
