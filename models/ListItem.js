const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ListItem extends Model {}

ListItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
        image: {
            type: DataTypes.BLOB('long')
        },
        content: {
            type: DataTypes.TEXT
        },
        isDone: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'list_item'
    }
);

module.exports = ListItem;