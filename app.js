if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
// console.log(process.env.SECRET) // remove this after you've confirmed it is working


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const listingsRouter = require('./routes/listing.js');
const reviewsRouter = require('./routes/review.js');
const User = require('./models/user.js');
const userRouter = require('./routes/user.js');

const dbUrl = process.env.ATLASDB_URL;

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on('error', () => {
    console.log('error in mongo session store.', err);
})

const sessionOptions = { 
    store,
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    },
};


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));


main()
    .then(() => {
        console.log('connection succesful.');
        
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}




app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





app.get('/', (req, res) => {
    res.redirect('/listings');
    // res.send('root is working!!');
})

app.use( (req, res, next) => {
    res.locals.sMsg = req.flash('success');
    res.locals.eMsg = req.flash('error');
    res.locals.currUser = req.user;
    next();
});

// app.get('/demouser', async (req, res) => {

//    let fakeUser = new User({
//         email: 'abc1234@gmail.com',
//         username: 'delta-student',
//    })

//    let registeredUser = await User.register(fakeUser, 'helloworld');  //the register method(static method) will automatically save this new user in database with the password -> 'helloworld'.

//    res.send(registeredUser);
// })

app.use('/', listingsRouter);
app.use('/', reviewsRouter);
app.use('/', userRouter);


// app.delete('/listings/:id/reviews/:reviewId',
//     wrapAsync(async (req, res) => {
//         let {id, reviewId} = req.params;

//         await Review.findByIdAndDelete(reviewId);
//         await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});

//         res.redirect(`/listings/${id}`);
//     })
// );



app.listen(8080 , () => {
    console.log("app is listenning on port 8080.");
})
