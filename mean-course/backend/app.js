const path = require("path");
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");

const app = express();

mongoose.connect("mongodb+srv://mean-user:sdcAguPeZnKvYWyp@clustermean-h5y4k.mongodb.net/node-angular", { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

//to disable CORS error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
     "Origin, X-Requested-with, Content-Type, Accept "
     );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
  next();
});

app.use("/api/posts", postsRoutes);

// to export coz we have to use this app as a listener
  module.exports = app;
