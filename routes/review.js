const express = require('express');
const router = express.Router({mergeParams: true});
const {reviewSchema} = require("../schema.js");
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');

const listings = require('./listing.js');


// Reviews //
// Post Route //
router.post('/listings/:id/reviews', async (req, res) => {
    
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${req.params.id}`);
    // res.send("review saved!!");
})

// Reviews //
// Delete Route //
router.delete('/listings/:id/reviews/:reviewId', async (req, res) => {
        let {id, reviewId} = req.params;

        await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
        await Review.findByIdAndDelete(reviewId);

        res.redirect(`/listings/${id}`)  
})


module.exports = router;