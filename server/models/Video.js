const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Module = require('./Module');

const Video = sequelize.define('Video', {
    idVideo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titlu: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idModule: {
        type: DataTypes.INTEGER,
        references: {
            model: Module,
            key: 'idModule'
        },
        allowNull: false
    }
}, {
    tableName: 'Video'
});

Video.belongsTo(Module, { foreignKey: 'idModule', as: 'module', onDelete: 'CASCADE' });
Module.hasMany(Video, { foreignKey: 'idModule', as: 'videos' });

module.exports = Video;
