const express = require('express');
const router = express.Router({mergeParams: true});
const Listing = require('../models/listing.js');
const {listingSchema} = require("../schema.js");
const {isLoggedIn, isOwner} = require('../middleware.js');

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});


// Index Route //
router.get('/listings', async (req, res) => {
    let listings = await Listing.find();
    res.render('lists/index.ejs', {listings});
    
})

// New Route //
router.get('/listings/new', isLoggedIn, (req, res) => {
    res.render('lists/new.ejs');
})

// Create Route //
// router.post('/listings', upload.single('listing[image]'), (req, res, file) => {
//     res.send(req.file);
//     // console.log(req.file);  
// })
router.post('/listings',isLoggedIn, upload.single('listing[image]'), async (req, res) => {
    // let {id, title, description, image, price, location, country} = req.body;
    
    let url = req.file.path;
    let filename = req.file.filename;
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash('success', 'New Listing Created!');    // req.flash('key', 'value/message' )
    res.redirect('/listings');
})


// Show Route //
router.get('/listings/:id', async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate({path:'reviews', populate:{path:'author'},}).populate('owner');
        if (!listing) {
            return res.status(404).send("Listing not found"); // ✅ Avoids passing null
        }
        res.render('lists/show.ejs', { listing });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error"); // ✅ Handles database errors
    }

    // let {id} = req.params;
    // let listing = await Listing.findById(id).populate('reviews').populate('owner');
    // console.log(listById);
    // res.render('lists/show.ejs', {listing});
   
    
})

// Edit Route //
router.get('/listings/:id/edit', isLoggedIn, isOwner, async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace('/upload', '/upload/w_250');

    res.render('lists/edit.ejs', {listing, originalImageUrl});
})

// Update Route //
router.put('/listings/:id', isLoggedIn,isOwner, upload.single('listing[image]'), async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== 'undefined'){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
  
    res.redirect(`/listings/${id}`);
})

// Delete Route //
router.delete('/listings/:id', isLoggedIn, isOwner, async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect(`/listings`);
})


module.exports = router;