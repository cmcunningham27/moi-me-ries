const router = require('express').Router();
const userRoutes = require('./userRoutes');
const listItemRoutes = require('./listItemsRoutes');

router.use('/users', userRoutes);

router.use('/listItems', listItemRoutes);

module.exports = router;