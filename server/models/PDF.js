const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Module = require('./Module');

const PDF = sequelize.define('PDF', {
    idPDF: {
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
    tableName: 'PDF'
});

PDF.belongsTo(Module, { foreignKey: 'idModule', as: 'module', onDelete: 'CASCADE' });
Module.hasMany(PDF, { foreignKey: 'idModule', as: 'pdfs' });

module.exports = PDF;
