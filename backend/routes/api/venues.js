const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');
const router = express.Router();

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const venue = await db.Venue.findByPk(req.params.id);
    // will have to include events here when those are created
    return res.json(venue);
}));

router.post('/:id(\\d+)/create', asyncHandler(async (req, res, next) => {
    const event = await db.Event.create(req.body);
    return res.json(event);
}))
// Need to figure out a route here to get the events onto the actual show pages
// Should it be done thro
router.get('/:id(\\d+)/events', asyncHandler(async (req, res, next) => {
    const events = await db.Event.findAll({where: { venueId: req.params.id }});
    return res.json(events)
}))

module.exports = router;