const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bucketRoutes = require('./bucketRoutes');

router.use('/users', userRoutes);
router.use('/users/buckets', bucketRoutes);

module.exports = router;