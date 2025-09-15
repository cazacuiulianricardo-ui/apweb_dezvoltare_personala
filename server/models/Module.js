
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Curs = require('./Curs');

const Module = sequelize.define('Module', {
    idModule: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nume: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idCurs: {
        type: DataTypes.INTEGER,
        references: {
            model: Curs,
            key: 'idCurs'
        },
        allowNull: false
    }
}, {
    tableName: 'Module'
});

Module.belongsTo(Curs, { foreignKey: 'idCurs', as: 'curs', onDelete: 'CASCADE' });
Curs.hasMany(Module, { foreignKey: 'idCurs', as: 'modules' });

module.exports = Module;
