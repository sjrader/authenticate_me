const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models')
const router = express.Router();

router.get('/all', asyncHandler(async (req, res, next) => {
    console.log('test')
    const events = await db.Event.findAll({
        order: [
            ['date', 'ASC'],
            ['startTime', 'ASC']
            ], include: db.Venue
    })
    return res.json(events)
}));

module.exports = router;