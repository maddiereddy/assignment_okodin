'use strict';
var faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
      var users = [];

      // these foobars created for testing, the random ones cannot be used for testing easily
      for (let i = 1; i <= 10; i++) {
        users.push({
          fname: `Foo${i}`,
          lname: `Bar${i}`,
          username: `FooBar${i}`,
          email: `FooBar${i}@gmail.com`,
          profileId: i + 1
        });
      }

      for (var i = 11; i <= 50; i++) {
        var firstName = faker.name.firstName();
        var lastName = faker.name.lastName();
        users.push({
          fname: `${firstName}`,
          lname: `${lastName}`,
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
