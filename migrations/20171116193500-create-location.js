'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      distance: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Distance cannot be empty!'
          },
          isNumeric: {
            msg: 'Distance must only be numbers!'
          }
        }
      },
      city: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'City cannot be empty!'
          },
          isAlpha: {
            msg: 'City must only be letters!'
          }
        }
      },
      state: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'State cannot be empty!'
          },
          isAlpha: {
            msg: 'State must only be letters!'
          }
        }
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
    return queryInterface.dropTable('Locations');
  }
};