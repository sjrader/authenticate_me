const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models')
const router = express.Router();

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const event = await db.Event.findByPk(req.params.id,{
    include: { model: db.Venue }
    });
    return res.json(event);
}));

router.post('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const newRsvp = await db.RSVP.create(req.body);
    return res.json(newRsvp);
}));

router.get('/:id(\\d+)/rsvps', asyncHandler(async (req, res, next) => {
    const rsvps = await db.RSVP.findAll({ where: {
     eventId: req.params.id 
    },
    });
    return res.json(rsvps)
}));

router.get('/homepageten', asyncHandler(async (req, res, next) => {
    const events = await db.Event.findall({offset: 3})
    return res.json(events)
}))

module.exports = router;