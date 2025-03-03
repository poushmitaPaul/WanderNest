const express = require('express');
const router = express.Router({mergeParams: true});
const Listing = require('../models/listing.js');
const {listingSchema} = require("../schema.js");



// Index Route //
router.get('/listings', async (req, res) => {
    let lists = await Listing.find();
    res.render('lists/index.ejs', {lists});
    
})

// New Route //
router.get('/listings/new', (req, res) => {
    res.render('lists/new.ejs');
})

// Create Route //
router.post('/listings', async (req, res) => {
    // let {id, title, description, image, price, location, country} = req.body;
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash('success', 'New Listing Created!');    // req.flash('key', 'value/message' )
    res.redirect('/listings');
})

// Show Route //
router.get('/listings/:id', async (req, res) => {
    // let {id} = req.params.id;
    let listById = await Listing.findById(req.params.id).populate('reviews');
    res.render('lists/show.ejs', {listById});
})

// Edit Route //
router.get('/listings/:id/edit', async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render('lists/edit.ejs', {listing});
})

// Update Route //
router.put('/listings/:id', async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

// Delete Route //
router.delete('/listings/:id', async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect(`/listings`);
})


module.exports = router;