const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: Number },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    dob: { type: String, required: true },
    password: { type: String, required: true, minLenght: 8 }
}, { versionKey: false, timestamps: true })

const User = mongoose.model("User", userSchema);
module.exports = { User };
