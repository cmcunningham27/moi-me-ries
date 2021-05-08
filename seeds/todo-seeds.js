const { ToDo } = require('../models');

const todoData = [
    {
        title: 'Indoor Skydive',
        bucket_id: 1
    },
    {
        title: 'Ride a Zip Line',
        bucket_id: 1
    },
    {
        title: 'Explore a Cave',
        bucket_id: 1
    },
    {
        title:  'Flip on a Trampoline',
        bucket_id: 2
    },
    {
        title:  'Ride in a Hot Air Balloon',
        bucket_id: 2
    },
    {
        title:  'Hold a Monkey',
        bucket_id: 2
    },
    {
        title:  'Visit pyramids',
        bucket_id: 3
    },
    {
        title:  ' Stand Under a Waterfall',
        bucket_id: 3
    },
    {
        title: 'Flyboarding',
        bucket_id: 3
    }
];

const seedToDos = () => ToDo.bulkCreate(todoData);

module.exports = seedToDos;