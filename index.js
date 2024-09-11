// MODULES
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
require("express-async-errors");

const errorHandler = require("./middlewares/errorHandler");

// commenting them for vercel deployment

// const usersRoutes = require("./routes/users.routes");
// const postsRoutes = require("./routes/posts.routes");
// const commentsRoutes = require("./routes/comments.routes");
// const likesRoutes = require("./routes/likes.routes");

const app = express();

// ENV FILE CONFIGURATION
require("dotenv").config();

PORT = process.env.PORT;
DB_URL = process.env.DB_URL;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// commenting them for vercel deployment

// app.use("/users", usersRoutes);
// app.use("/posts", postsRoutes);
// app.use("/comments", commentsRoutes);
// app.use("/likes", likesRoutes);

app.use(errorHandler);

// adding all routes here for vercel deployment

/************************users routes****************************/
const { signup, login } = require("./controllers/users.controllers");
const auth = require("./middlewares/auth");
const upload = require("./utils/multerConfig");

app.post("/signup", upload.single('profilePicture'), signup);
app.post("/login", login);

/************************posts routes****************************/
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("./controllers/posts.controllers");

app.post("/posts/create", auth, createPost);
app.get("/posts/", getPosts);
app.get("/posts/:id", getPostById);
app.put("/posts/:id", auth, updatePost);
app.delete("/posts/:id", auth, deletePost);

module.exports = app;



mongoose
  .connect(DB_URL)
  .then(async () => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });
