const { Bucket } = require('../models');

const bucketData = [
    {
        title: 'Sal Bucket',
        user_id: 1
    },
    {
        name: 'Lernantino Bucket',
        user_id: 2
    },
    {
        name: 'Amikov Bucket',
        user_id: 3
    }
];

const seedBuckets = () => Bucket.bulkCreate(bucketData);

module.exports = seedBuckets;