const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const venuesRouter = require('./venues.js')
const eventsRouter = require('./events.js');
const searchRouter = require('./search.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/venues', venuesRouter);
router.use('/events', eventsRouter);
router.use('/search', searchRouter);


module.exports = router;