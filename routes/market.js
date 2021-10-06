// const express = require('express');
// const router = express.Router();
// const Item = require('../models/item');
// router.get('/', async (req, res) => {

//     const items = await Item.find({})

//     res.render('index', { items })
// })

// // show new item
// router.get('/new', (req, res) => {
//     res.render('new')
// })

// // create new item
// router.post('/', async (req, res) => {
//     const newItem = new Item(req.body)
//     await newItem.save();
//     res.redirect('/market')
// })

// //find items by id
// router.get('/:id', async (req, res) => {

//     const { id } = req.params;
//     const item = await Item.findById(id)

//     res.render('show', { item })
// })

// // route for editing
// router.get('/:id/edit', async (req, res) => {
//     const { id } = req.params;
//     const item = await Item.findById(id)

//     res.render('edit', { item })
// })

// //update items 
// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const editItem = await Item.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })

//     res.redirect(`/market/${editItem._id}`)
// })

// //delete item
// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     const deleteItem = await Item.findByIdAndDelete(id)

//     res.redirect(`/market`)
// })

// module.exports = router;