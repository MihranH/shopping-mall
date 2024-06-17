'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('ALTER TABLE categories AUTO_INCREMENT = 1');
    await queryInterface.bulkInsert('categories', [{
        title: 'Sport',
        description: 'Everything related to sport',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        title: 'Underwear',
        description: 'Everything related to underwear',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        title: 'Dress',
        description: 'Everything related to dress',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
