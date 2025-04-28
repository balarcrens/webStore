const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/?directConnection=true"

const connectMongo = () => {
    mongoose.connect(URI);
    // console.log("connected to mongoDB");
}

module.exports = connectMongo;