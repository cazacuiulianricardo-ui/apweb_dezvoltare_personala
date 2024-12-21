const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Utilizator = require('./Utilizator');


const Abonament = sequelize.define('Abonament', {
    idAbonament: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tip: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Standard', 'Premium', 'Anual']]
        }
    },
    pret: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    drepturi: {
        type: DataTypes.TEXT,
        allowNull: false 
    },
    dataInceperii: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    dataExpirarii: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue() {
            const startDate = new Date();
            if (this.tip === 'Anual') {
                startDate.setFullYear(startDate.getFullYear() + 1);
            } else {
                startDate.setMonth(startDate.getMonth() + 1);
            }
            return startDate;
        }
    }
}, {
    tableName: 'Abonament'
});

Abonament.belongsTo(Utilizator, { foreignKey: 'idUtilizator', onDelete: 'CASCADE' });

module.exports = Abonament;
