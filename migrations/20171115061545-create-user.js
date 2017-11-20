'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Username cannot be empty!'
          },
          isAlphanumeric: {
            msg: 'Username must only be numbers and letters!'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'Email cannot be empty!'
          },
          isEmail: {
            msg: 'Must provide a valid email!'
          }
        }
      },
      profileId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};