require('dotenv').config();
const mongoose = require('mongoose');

const DB_PASSWORD = process.env.DB_PASSWORD;

const connectToMongo = () => {
    mongoose.connect('mongodb://localhost:27017/blogDBhai',{
        useNewUrlParser: true,
    }, () => {
        console.log("connected mongo")
    });
};

module.exports = connectToMongo;