const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    age: {
        type: Number,
    },
    dateJoined: {
        type: String,
        default: new Date()
    }
})

module.exports = User = mongoose.model('User', userSchema);