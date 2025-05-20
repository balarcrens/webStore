const mongoose = require('mongoose');

const connectMongo = () => {
    mongoose.connect("mongodb+srv://balarcrens188:crens446@cluster0.xzu7dp3.mongodb.net/webstore?retryWrites=true&w=majority", {
        serverSelectionTimeoutMS: 15000,
    }).then(() => console.log('MongoDB Connected'))
        .catch(err => console.error('MongoDB Error:', err));
}

module.exports = connectMongo;