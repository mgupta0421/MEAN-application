const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post.js');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://mitaligupta726:mu95x0QRM4u0uNjk@cluster0.vlwuaqq.mongodb.net/node-anguler?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to database");
    })
    .catch(() => {
        console.log("Connection not working");
    });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Requested-With, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});


app.get('/api/posts', (req,res,next) => {
    Post.find()
    .then(documents => {
        res.status(200).json({
            message: 'Data received',
            posts: documents
        });    
    });  
});

app.post('/api/posts',(req,res,next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});


module.exports = app;