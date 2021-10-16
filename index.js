const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override')
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const { isLoggedIn } = require('./middleware');

const Item = require('./models/item');
//const market = require('./routes/market')
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
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

const sessionConfig = {
    secret: 'bettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    if (!['/login', '/register', '/'].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl
    }
    res.locals.signInUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next();
})


//show all items
app.get('/items', async (req, res) => {

    const items = await Item.find({})

    res.render('index', { items })
})

// show new item
app.get('/items/new', isLoggedIn, (req, res) => {
    res.render('new')
})

// create new item
app.post('/items', isLoggedIn, async (req, res) => {
    const newItem = new Item(req.body)
    newItem.author = req.user._id
    await newItem.save();
    req.flash('success', 'Successfully add a new item')
    res.redirect('/items')
})

//find items by id
app.get('/items/:id', async (req, res) => {

    const { id } = req.params;
    const item = await Item.findById(id).populate('author')
    console.log(item)
    if (!item) {
        req.flash('error', "Cannot find Item")
        return res.redirect('/items')
    }

    res.render('show', { item })
})

// route for editing
app.get('/items/:id/edit', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id)
    if (!item) {
        req.flash('error', "Cannot find Item")
        return res.redirect('/items')
    }

    res.render('edit', { item })
})

//update items 
app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const editItem = await Item.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })

    res.redirect(`/items/${editItem._id}`)
})

//delete item
app.delete('/items/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const deleteItem = await Item.findByIdAndDelete(id)
    req.flash('error', "Item Deleted")
    res.redirect(`/items`)
})

app.get('/register', (req, res) => {
    res.render('users/register')
})

app.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to the Market')
            res.redirect('/items')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')

    }

})

app.get('/login', (req, res) => {
    res.render('users/login')
})
app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome');
    const reditectUrl = req.session.returnTo || 'items'
    delete req.session.returnTo
    res.redirect(reditectUrl)
})
app.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged Out')
    res.redirect('/items')
})


app.listen(3000, () => {
    console.log("APP IS ON PORT 3000")
})