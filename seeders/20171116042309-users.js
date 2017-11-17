'use strict';
var faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
      var users = [];
      for (var i = 1; i <= 50; i++) {
        var firstName = faker.name.firstName();
        var lastName = faker.name.lastName();
        users.push({
          username: `${firstName}.${lastName}`,
          email: `${firstName}.${lastName}@gmail.com`,
          profileId: i
        });
      }
      return queryInterface.bulkInsert('Users', users);
    },

    down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {}, models.User);
  }
};
