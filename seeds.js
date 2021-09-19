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
        name: 'Tv',
        price: 100.00,
        description: 'Electronic',
        status: 'In stock'
        
    }
]
    
Item.insertMany(seedItem);