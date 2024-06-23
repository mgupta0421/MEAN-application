const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Requested-With, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});


app.use('/api/posts', (req,res,next) => {
    const posts = [
        {
            title:'title1', 
            content:'content2'
        },
        {
            title:'title2', 
            content:'content2'
        }
       ]
    res.status(200).json({
        message: 'Data received',
        posts: posts
    });
});


module.exports = app;