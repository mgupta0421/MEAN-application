const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Requested-With, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});


app.get('/api/posts', (req,res,next) => {
    const posts = [
        {
            id:'1',
            title:'title1', 
            content:'content2'
        },
        {
            id:'2',
            title:'title2', 
            content:'content2'
        }
       ]
    res.status(200).json({
        message: 'Data received',
        posts: posts
    });
});

app.post('/api/posts',(req,res,next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});


module.exports = app;