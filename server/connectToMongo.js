require('dotenv').config();
const mongoose = require('mongoose');

const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.set("strictQuery", false);

const connectToMongo = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/blogDatabase', () => {
        console.log("Connected to mongodb database sucessfully!")
    });
};

module.exports = connectToMongo;