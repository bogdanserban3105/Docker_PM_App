const express = require('express'); // import express
const app = express(); // create express app
const mongoose = require("mongoose"); // import mongoose
var cors = require('cors'); // import cors

 

app.use(express.json());    // parse json bodies
app.use(cors()); // enable cors

const taskRouter = require("./routes/taskRoutes");// import taskRoutes
const userRouter= require("./routes/userRoutes");// import userRoutes

app.get("/", (req, res) => res.send("<h1>It's working</h1> go to <a href='/tasks'>tasks</a>"));     // create a route for the app

app.use("/tasks", taskRouter); // use taskRoutes
app.use("/users", userRouter); // use userRoutes

mongoose.connect( // connect to the database
    "mongodb+srv://mihailhanga:ParolaCrystal@cluster0.mjivone.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true } 
).then(() => {
    const { createProxyMiddleware } = require('http-proxy-middleware');
    app.use('/api', createProxyMiddleware({
        target: 'http://localhost:8080/', //original url
        changeOrigin: true,
        //secure: false,
        onProxyRes: function (proxyRes, req, res) {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        }
    })); // creates a proxy server that redirects requests to the original url
    app.listen(4000);
});

