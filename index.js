const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const engine= require('ejs-mate');
const methodOverride = require('method-override')

const Item = require('./models/item');

mongoose.connect('mongodb://localhost:27017/market')
    .then(() => {
        console.log("MONGO CONNECTION ON")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR")
        console.log(err)
    })


app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine)
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))


// show all items
app.get('/items', async(req,res) =>{

    const items = await Item.find({})
    
    res.render('index',{items})
})

// show new item
app.get('/items/new',(req,res) => {
    res.render('new')
})

// create new item
app.post('/items', async (req,res) => {
    const newItem = new Item(req.body)
    await newItem.save();
    res.redirect('/items')
})

//find items by id
app.get('/items/:id', async(req,res) =>{

    const { id } = req.params;
    const item = await Item.findById(id)
    
    res.render('show',{item})
})

// route for editing
app.get('/items/:id/edit', async (req,res) => {
    const { id } = req.params;
    const item = await Item.findById(id)

    res.render('edit', {item})
})

//update items 
app.put('/items/:id', async (req,res) => {
    const { id } = req.params;
    const editItem = await Item.findByIdAndUpdate(id, req.body, {runValidators: true, new: true} )

    res.redirect(`/items/${editItem._id}`)
})

//delete item
app.delete('/items/:id', async (req,res) => {
    const { id } = req.params;
    const deleteItem = await Item.findByIdAndDelete(id)

    res.redirect(`/items`)
})

app.listen(3000, ()=>{
    console.log("APP IS ON PORT 3000")
})