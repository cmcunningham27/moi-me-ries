const { ToDo } = require('../models');

const todoData = [
    {
        title: 'Indoor Skydive',
        user_id: 1
    },
    {
        title: 'Ride a Zip Line',
        user_id: 1
    },
    {
        title: 'Explore a Cave',
        user_id: 1
    },
    {
        title:  'Flip on a Trampoline',
        user_id: 2
    },
    {
        title:  'Ride in a Hot Air Balloon',
        user_id: 2
    },
    {
        title:  'Hold a Monkey',
        user_id: 2
    },
    {
        title:  'Visit pyramids',
        user_id: 3
    },
    {
        title:  ' Stand Under a Waterfall',
        user_id: 3
    },
    {
        title: 'Flyboarding',
        user_id: 3
    }
];

const seedToDos = () => ToDo.bulkCreate(todoData);

module.exports = seedToDos;