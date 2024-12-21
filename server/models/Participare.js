const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Utilizator = require('./Utilizator');
const Curs = require('./Curs');

const Participare = sequelize.define('Participare', {
    idUtilizator: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Utilizator,
            key: 'idUtilizator'
        }
    },
    idCurs: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Curs,
            key: 'idCurs'
        }
    }
}, {
    tableName: 'Participare',
    timestamps: false
});
Participare.belongsTo(Utilizator, { foreignKey: 'idUtilizator' });
Participare.belongsTo(Curs, { foreignKey: 'idCurs' });

module.exports = Participare;
