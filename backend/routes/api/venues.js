const express = require('express');
const asyncHandler = require('express-async-handler');
const { Venue } = require('../../db/models');
const router = express.Router();

router.get('/:id(\\d+)', asyncHandler(async function(req, res) {
    const venue = await Venue.findByPk(req.params.id);
    // will have to include events here when those are created
    return res.json(venue);
}));

module.exports = router;