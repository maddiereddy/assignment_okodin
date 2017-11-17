'use strict';

module.exports = (sequelize, DataTypes) => {

  var Profile = sequelize.define('Profile', 
  {
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    maritalStatus: DataTypes.STRING,
    height: DataTypes.STRING,
    bodyType: DataTypes.STRING,
    kids: DataTypes.BOOLEAN,
    pets: DataTypes.BOOLEAN,
    occupation: DataTypes.STRING,
    education: DataTypes.STRING,
    aboutMe: DataTypes.TEXT,
    talents: DataTypes.ARRAY(DataTypes.TEXT),
    favorites: DataTypes.ARRAY(DataTypes.TEXT),
    whyMe: DataTypes.TEXT,
    picture: DataTypes.STRING,
    locationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  Profile.associate = function(models) {
        // associations can be defined here
    Profile.belongsTo(models.User, {
      foreignKey: "userId"
    });

    Profile.hasOne(models.Location, {
      foreignKey: 'locationId'
    });
  };

  return Profile;
};