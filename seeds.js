const mongoose = require('mongoose');

const Item = require('./models/item');

mongoose.connect('mongodb://localhost:27017/market')
    .then(() => {
        console.log("MONGO CONNECTION ON")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR")
        console.log(err)
    })

const seedItem = [


    {
        name: 'Chair',
        price: 5.00,
        description: 'Furniture',
        status: 'sold'

    },

    {
        author: '6158b09ea85d2d3f7f1b6604',
        name: 'Tv',
        images: [
            {
                url: String,
                filename: String
            }
        ],
        price: 100.00,
        description: 'Electronic',
        status: 'In stock'
    }
]

Item.insertMany(seedItem);