const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    // image:{
    //     type: Object,
    //     default: {
    //         filename: String,
    //         url: 'https://images.unsplash.com/photo-1725759675905-ffefc70268e3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYXV0aWZ1bCUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D'
    //     },
    //     set: (url) => 
    //         url === ' ' 
    //             ? "https://images.unsplash.com/photo-1725759675905-ffefc70268e3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYXV0aWZ1bCUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D" 
    //             : url,
    // },
    image: {
        type: Object,
        default: {
          filename: "default.jpg",
          url: "https://images.unsplash.com/photo-1547721064-da6cfb341d50",
        },
        set: (url) => {url :  "https://images.unsplash.com/photo-1547721064-da6cfb341d50"},
        // set: (url) => (url && url.trim() ? url : "https://images.unsplash.com/photo-1547721064-da6cfb341d50"),
      },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country:{
        type: String,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review",
        },
    ]
})

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;