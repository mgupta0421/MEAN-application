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
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
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
    post.save().then(result => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: result._id
        });
    });
    
});

app.put('api/posts/:id', (req,res,next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id }, post).then(result =>{
        res.status(200).json({message: 'Updated SUCCESSFULLY'});
    })
})

app.delete('/api/posts/:id', (req,res,next) => {
    Post.deleteOne({_id: req.params.id})
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'delete successfully'
        });
    })
    
app.get('api/post/:id', (req,res,next) => {
    Post.findById(req.params.id)
    .then(post => {
        if(post){
            res.status(200).json(post);
        }else{
            res.status(400).json({ message: 'Post not found'});
        }
    })
})
    
});


module.exports = app;