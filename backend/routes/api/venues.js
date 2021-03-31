const express = require('express');
const asyncHandler = require('express-async-handler');
const { Venue } = require('../../db/models');
const { Event } = require('../../db/models')
const router = express.Router();

router.get('/:id(\\d+)', asyncHandler(async function(req, res) {
    const venue = await Venue.findByPk(req.params.id);
    // will have to include events here when those are created
    return res.json(venue);
}));

router.post('/:id(\\d+)/create', asyncHandler(async (req, res, next) => {
    const event = await Event.create(req.body);
    return res.json(event);
}))

module.exports = router;