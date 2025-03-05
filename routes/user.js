const express = require('express');
const router = express.Router({mergeParams:true});
const User = require('../models/user.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');


router.get('/signup', (req, res) => {
    res.render('users/signup.ejs');
});
router.post('/signup', async(req, res, next) => {    // async --> wrapAsync
    try {
        let {username, email, password} = req.body;

        const newUser = new User({email, username});
        const registeredUser = await User.register( newUser, password); 

        req.logIn(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash('success', 'Welcome to wanderNest !!');
            res.redirect('/listings');
        })  
        
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
    // it is still didn't throwing error for entering same username
});

router.get('/login', (req, res) => {
    res.render('users/login.ejs');
});

router.post(
    '/login',
    saveRedirectUrl, 
    passport.authenticate('local', { 
        failureRedirect: '/login',
        failureFlash: true,
    }), 
    async (req, res) => {  
        req.flash('success', 'Welcome to wanderNest ~~ You are Successfully LoggedIn !!');

        let redirectUrl = res.locals.redirectUrl || '/listings';
        res.redirect(redirectUrl);
    }
);


router.get('/logout', (req, res, next) => {
    req.logOut((err) => {
        if(err){
            return next(err);
        } 
        req.flash('success', 'You are successfully logged out!');
        res.redirect('/listings');
    });
    
});


module.exports = router;