const express = require('express');
const router = express.Router();


// USERS //
// Index Route
router.get('/', (req, res) => {
    res.send('index route for users.');
})

// Show Route
router.get('/:id', (req, res) => {
    res.send('show route for users.');
})

// Post Route
router.post('/', (req, res) => {
    res.send('post route for users.');
})

// Delete Route
router.delete('/:id', (req, res) => {
    res.send('delete route for users.');
})


module.exports = router;