const Item = require('./models/item');

module.exports.isLoggedIn = ((req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in first')
        return res.redirect('/login')
    }
    next();
})

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params
    const item = await Item.findById(id)
    if (!item.author.equals(req.user._id)) {
        req.flash('error', 'Permission Denied')
        return res.redirect(`/items/${id}`)
    }
    next()
}