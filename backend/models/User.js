const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user'
    }
});
const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;