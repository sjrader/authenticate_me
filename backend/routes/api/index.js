const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const venuesRouter = require('./venues.js')
const eventsRouter = require('./events')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/venues', venuesRouter);
router.use('/events', eventsRouter)


module.exports = router;