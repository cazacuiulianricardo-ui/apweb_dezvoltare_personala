const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Utilizator = require('./Utilizator');
const Curs = require('./Curs');

const Evaluare = sequelize.define('Evaluare', {
    idEvaluare: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    punctaj: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0,
            max: 100
        }
    },
    dataEvaluarii: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Evaluare'
});
Evaluare.belongsTo(Utilizator, { foreignKey: 'idUtilizator', onDelete: 'CASCADE' });
Evaluare.belongsTo(Curs, { foreignKey: 'idCurs', onDelete: 'CASCADE' });

module.exports = Evaluare;
