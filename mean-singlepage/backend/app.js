const express = require('express');

const app = express();

app.use((req,res,next) => {
    console.log('I am app');
    next();
});

app.use((req,res,next) => {
    res.send('This is the response');
});



module.exports = app;