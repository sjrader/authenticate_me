const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const venuesRouter = require('./venues.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/venues', venuesRouter);


module.exports = router;