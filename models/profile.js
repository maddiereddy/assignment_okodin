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
    pets: DataTypes.ARRAY(DataTypes.TEXT),
    occupation: DataTypes.STRING,
    education: DataTypes.STRING,
    aboutMe: DataTypes.TEXT,
    talents: DataTypes.ARRAY(DataTypes.TEXT),
    favorites: DataTypes.ARRAY(DataTypes.TEXT),
    hobbies: DataTypes.ARRAY(DataTypes.TEXT),
    whyMe: DataTypes.TEXT,
    picture: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
    likes: DataTypes.ARRAY(DataTypes.INTEGER),
    views: DataTypes.ARRAY(DataTypes.INTEGER),
    viewedBy: DataTypes.ARRAY(DataTypes.INTEGER),
    locationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  Profile.associate = function(models) {
        // associations can be defined here
    Profile.belongsTo(models.User, {
      foreignKey: "userId"
    });

    Profile.belongsTo(models.Location, {
      foreignKey: 'locationId'
    });
  };

  return Profile;
};