const mongoose = require('mongoose');

const connectMongo = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 15000,
    }).then(() => console.log('MongoDB Connected'))
        .catch(err => console.error('MongoDB Error:', err));
}

module.exports = connectMongo;