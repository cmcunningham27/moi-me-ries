const User = require('./User');
const Bucket = require('./Bucket');
const ToDo = require('./ToDo');
const Done = require('./Done');

//shoulb be has many right?
User.hasOne(Bucket, {
    foreignKey: 'user_id',

});
Bucket.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


User.hasMany(ToDo, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
ToDo.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


User.hasMany(Done, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Done.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});



ToDo.hasMany(Done, {
    foreignKey: 'todo_id',
    onDelete: 'CASCADE'
});
Done.belongsTo(ToDo, {
    foreignKey: 'todo_id',
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    Bucket,
    ToDo,
    Done
};