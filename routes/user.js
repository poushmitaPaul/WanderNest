const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const passport = require('passport');


router.get('/signup', (req, res) => {
    res.render('users/signup.ejs');
});
router.post('/signup', async (req, res) => {    // async --> wrapAsync
    try {
        let {username, email, password} = req.body;

        const newUser = new User({email, username});
        const registeredUser = await User.register( newUser, password); 

        req.flash('success', 'Welcome to wanderNest !!');
        res.redirect('/listings');
        
    } catch (e) {
        req.flash('error', e.message );
        res.redirect('/signup');
    }
    // it is still didn't throwing error for entering same username
});

router.get('/login', (req, res) => {
    res.render('users/login.ejs');
});

router.post(
    '/login', 
    passport.authenticate('local', { 
        failureRedirect: '/login',
        failureFlash: true,
    }), 
    async (req, res) => {  
        req.flash('success', 'Welcome to wanderNest ~~ You are Successfully LoggedIn !!');
        res.redirect('/listings');
    }
);

module.exports = router;