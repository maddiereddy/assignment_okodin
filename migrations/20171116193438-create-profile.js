'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      age: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.STRING
      },
      maritalStatus: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.STRING
      },
      bodyType: {
        type: Sequelize.STRING
      },
      kids: {
        type: Sequelize.BOOLEAN
      },
      pets: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      occupation: {
        type: Sequelize.STRING
      },
      education: {
        type: Sequelize.STRING
      },
      aboutMe: {
        type: Sequelize.TEXT
      },
      talents: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      favorites: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      hobbies: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      whyMe: {
        type: Sequelize.TEXT
      },
      picture: {
        type: Sequelize.STRING
      },
      lastLogin: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      likes: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      views: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      viewedBy: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      locationId: {
        type: Sequelize.INTEGER
      },
      userId: {
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
    return queryInterface.dropTable('Profiles');
  }
};