'use strict';

module.exports = (sequelize, DataTypes) => {

  var Location = sequelize.define('Location', {
    distance: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  });
      
  Location.associate = function(models) {
    // associations can be defined here
    Location.hasOne(models.Profile, {
      foreignKey: 'locationId'
    });
  };

  return Location;
};