const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
// const withAuth = require('../../utils/auth');

router.use('/', homeRoutes);



module.exports = router;

