const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('primul', 'postgres', '123iulian123', {
    host: 'localhost',
    dialect: 'postgres'
});


module.exports = sequelize;
