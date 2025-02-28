const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');

const listings = require('./routes/listing.js');
const reviews = require('./routes/review.js');

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
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}





app.get('/', (req, res) => {
    res.send('root is working!!');
})

app.use('/', listings);
app.use('/', reviews);


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
