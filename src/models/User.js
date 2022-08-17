const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        discord_id: { type: Number, required: true, unique: true },
        token: { type: String, required: true },
    }
);

module.exports = mongoose.model('User', UserSchema);