const express = require('express');
const router = express.Router();


// POSTS //
// Index Route
router.get('/', (req, res) => {
    res.send('index route for posts.');
})

// Show Route
router.get('/:id', (req, res) => {
    res.send('show route for posts.');
})

// Post Route
router.post('/', (req, res) => {
    res.send('post route for posts.');
})

// Delete Route
router.delete('/:id', (req, res) => {
    res.send('delete route for posts.');
})


module.exports = router;