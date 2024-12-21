const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Utilizator = require('./Utilizator');

const Curs = sequelize.define('Curs', {
    idCurs: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titlu: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descriere: {
        type: DataTypes.TEXT
    },
    dataIncepere: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dataFinalizare: {
        type: DataTypes.DATE,
        allowNull: false
    },
    durata: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true,
            min: 1
        }
    },
    nivelDificultate: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['începător', 'avansat']]
        }
    }
    , 
    idInstructor: {
        type: DataTypes.INTEGER,
        references: {
            model: Utilizator,
            key: 'idUtilizator'
        },
        allowNull: false
    }
}, {
    tableName: 'Curs'
});

Curs.belongsTo(Utilizator, { foreignKey: 'idInstructor', as: 'instructor' ,onDelete: 'SET NULL' });

module.exports = Curs;
