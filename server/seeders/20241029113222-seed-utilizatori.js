'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Utilizator', [{
      nume: 'Test User',
      email: 'testuser@example.com',
      parola: 'hashedpassword',
      tipUtilizator: 'client',
      dataInregistrare: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      varsta: 20
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Utilizator', null, {});
  }
};
