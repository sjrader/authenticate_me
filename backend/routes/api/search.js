const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models')
const router = express.Router();

router.get('/all', asyncHandler(async (req, res, next) => {
    const events = await db.Event.findAll({
        order: [
            ['date', 'ASC'],
            ['startTime', 'ASC']
            ], include: db.Venue
    })
    return res.json(events)
}));

router.get('/', asyncHandler(async (req, res, next) => {
    console.log(res)
    const events = await db.Event.findAll()
    return res.json(events)
}));

module.exports = router;