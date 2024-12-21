const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Utilizator = require('./Utilizator');
const Curs = require('./Curs');

const Recenzie = sequelize.define('Recenzie', {
    idRecenzie: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    },
    comentariu: {
        type: DataTypes.TEXT
    },
    dataRecenziei: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Recenzie'
});

Recenzie.belongsTo(Utilizator, { foreignKey: 'idUtilizator', onDelete: 'CASCADE' });
Recenzie.belongsTo(Curs, { foreignKey: 'idCurs', onDelete: 'CASCADE' });

module.exports = Recenzie;
