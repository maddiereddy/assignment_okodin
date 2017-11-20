'use strict';
var faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var locations = [];

    for (let i = 1; i <= 100; i++) {
      locations.push({
        city: faker.address.city(),
        state: faker.address.state(),
        distance: Math.floor(Math.random() * 100) + 1
      });
    }
    return queryInterface.bulkInsert('Locations', locations);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', null, {}, models.Location);
  }
};
