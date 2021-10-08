const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,
    }, 
    lang: {
        type: String,
    }
})

module.exports = mongoose.model('Guild', GuildSchema)