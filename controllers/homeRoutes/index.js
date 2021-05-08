const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
// const logIn = require('../api/userRoutes');

// router.use('/login', logIn);
router.use('/', homeRoutes);

module.exports = router;