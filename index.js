// MODULES
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
require("express-async-errors");


const errorHandler = require("./middlewares/errorHandler");
const logger = require("./utils/logging/logger");

const User = require("./models/user.model");

const usersRoutes = require("./routes/users.routes");
const postsRoutes = require("./routes/posts.routes");
const commentsRoutes = require("./routes/comments.routes");
const likesRoutes = require("./routes/likes.routes");

const app = express();

// ENV FILE CONFIGURATION
require("dotenv").config();

PORT = process.env.PORT;
DB_URL = process.env.DB_URL;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);
app.use("/likes", likesRoutes);

app.use(errorHandler);

mongoose
  .connect(DB_URL)
  .then(async () => {
    logger.log({
      level: "info",
      message: "Connected to DB",
    });

    app.listen(PORT, () =>
      logger.log({
        level: "info",
        message: `server running on port ${PORT}`,
      })
    );
  })
  .catch((err) => {
    logger.log({
      level: "error",
      message: err.message,
    });
  });
