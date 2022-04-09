const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        required: true,
        type: String,
    },
    image: {
        required: true,
        type: String,
    }
});


const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;