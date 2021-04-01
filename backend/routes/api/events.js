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



module.exports = router;