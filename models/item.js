const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },

    description: {
        type: String,
        require: true
    },

    status: {
        type: String,
        require: true
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    images: [
        {
            url: String,
            filename: String
        }
    ]

})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;