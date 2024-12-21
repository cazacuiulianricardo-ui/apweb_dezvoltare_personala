const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../db');

const Utilizator = sequelize.define('Utilizator', {
    idUtilizator: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nume: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    parola: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipUtilizator: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['client', 'instructor']]
        }
    },
    dataInregistrare: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'Utilizator',
 
});

Utilizator.beforeCreate(async (utilizator) => {
    if (utilizator.parola) {
        utilizator.parola = await bcrypt.hash(utilizator.parola, 10);
    }
});

Utilizator.prototype.verifyPassword = async function(parola) {
    return await bcrypt.compare(parola, this.parola);
};

module.exports = Utilizator;
