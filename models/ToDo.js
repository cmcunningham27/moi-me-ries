const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ToDo extends Model {}

ToDo.init({
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
    bucket_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'bucket',
            key: 'id'
        },
    },
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'todo'
}
);
module.exports = ToDo;