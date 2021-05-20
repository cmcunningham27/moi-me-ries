const User = require('./User');
const ListItem = require('./ListItem');

User.hasMany(ListItem, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
ListItem.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = {
    User,
    ListItem
};