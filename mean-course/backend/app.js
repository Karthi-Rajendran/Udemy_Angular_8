const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

//to disable CORS error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
     "Origin, X-Requested-with, Content-Type, Accept "
     );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
    );
  next();
});

//add midddleware with app keyword
// app.use((req, res, next) => {
//   console.log('First middleware');
//   next(); // important, if not sending a response
// });

// app.use((req, res, next) => {
//   res.send('Hello from express!');
// });

app.post("/api/posts", ( req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
      message: 'Post added successfully'
    });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
        { id: 'sadsfswsd',
          title: 'First server-side post',
          content: 'This is coming from server' },
        { id: 'ghertdfdg',
          title: 'Second server-side post',
          content: 'This is coming from server !' },
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  });
});

// to export coz we have to use this app as a listener
module.exports = app;
