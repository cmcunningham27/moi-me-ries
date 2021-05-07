const User = require('./User');
const Bucket = require('./Bucket');
const ToDo = require('./ToDo');
const Done = require('./Done');

User.hasOne(Bucket, {
    foreignKey: 'user_id',

});
Bucket.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


Bucket.hasMany(ToDo, {
    foreignKey: 'bucket_id',
    onDelete: 'CASCADE'
});
ToDo.belongsTo(Bucket, {
    foreignKey: 'bucket_id',
    onDelete: 'CASCADE'
});


Bucket.hasMany(Done, {
    foreignKey: 'bucket_id',
    onDelete: 'CASCADE'
});
Done.belongsTo(Bucket, {
    foreignKey: 'bucket_id',
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