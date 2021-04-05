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
    const eventId = parseInt(req.params.id);
    const { userId, attendStatus } = req.body;
    const rsvp = await db.RSVP.findAll({ 
        where: { eventId, userId }
    })
    if (rsvp.length) {
        await db.RSVP.update(
            { attendStatus },
            {where: { userId, eventId }}
        )
        return res.json(attendStatus);
    }
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
    const events = await db.Event.findAll({
        order: [
            ['date', 'ASC'],
            ['startTime', 'ASC']
            ],
            limit: 5, include: db.Venue
            })
    return res.json(events)
}));

router.get('/rsvps/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const events = await db.RSVP.findAll({
        where: {
            attendStatus: 'attending',
            userId: req.params.id
        }, include: db.Event
    })
    return res.json(events)
}));
//Need to fix this route to make sure it gets the correct order for the upcoming events

module.exports = router;