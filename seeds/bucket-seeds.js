const { Bucket } = require('../models');

const bucketData = [
    {
        title: 'Sal Bucket',
        user_id: 1
    },
    {
        title: 'Lernantino Bucket',
        user_id: 2
    },
    {
        title: 'Amikov Bucket',
        user_id: 3
    }
];

const seedBuckets = () => Bucket.bulkCreate(bucketData);

module.exports = seedBuckets;