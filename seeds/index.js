const seedUsers = require('./user-seeds');
const seedBuckets = require('./bucket-seeds');
const seedToDos = require('./todo-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync();
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedBuckets();
    console.log('\n----- BUCKETS SEEDED -----\n');

    await seedToDos();
    console.log('\n----- TODOS SEEDED -----\n');


    process.exit(0);
};

seedAll();
