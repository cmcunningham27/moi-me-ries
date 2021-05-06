const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const bucketRoutes = require('./bucketRoutes');

router.use('/api/users', userRoutes);
router.use('/users/buckets', bucketRoutes);

module.exports = router;