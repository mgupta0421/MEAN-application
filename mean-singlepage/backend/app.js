const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');

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

app.use('/api/posts',postRoutes);

module.exports = app;