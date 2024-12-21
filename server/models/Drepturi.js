const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Drepturi = sequelize.define('Drepturi', {
    idDrepturi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipAbonament: {
        type: DataTypes.STRING,
        allowNull: false
    },
    drepturi: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'Drepturi'
});

module.exports = Drepturi;
