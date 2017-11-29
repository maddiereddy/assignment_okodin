var express = require("express");
var router = express.Router();
var models = require("./../models");
var User = models.User;
var Profile = models.Profile;
var Location = models.Location;
var sequelize = models.sequelize;

module.exports = app => {

  router.get("/", (req, res) => {
    User.findAll({
      where: {
        email: {
          $ne: req.session.currentUser.email
        }
      },
      include: [{model: Profile}],
      order: [[User.associations.Profile, "id"]]
    }).then(users => {
      res.render("search/index", { users });
    });
  });

  router.post("/", (req, res) => {
    var maritalStatus = [
      'Single',
      'Engaged',
      'Married',
      'In a civil union',
      'In a relationship',
      `It's complicated`,
      'Separated',
      'Divorced',
      'Widowed'];

    var bodyType = [
      'Slender',
      'Average',
      'Curvy',
      'Chubby',
      'Toned',
      'Heavyset',
      'Tall',
      'Petite'
    ];

     var education = [
      'High School',
      'Bachelors',
      'Graduate',
      'Post Graduate',
      'PhD',
      'Medicine',
      'Law',
      'Engineering'
    ];

    var status = (req.body.user.profile.status === "Any") ? maritalStatus : [req.body.user.profile.status];
    var gender = [req.body.user.profile.gender] || ["Male", "Female"];
    var bodyT = (req.body.user.profile.bodyType === "Any") ? bodyType : [req.body.user.profile.bodyType];
    var education = (req.body.user.profile.education === "Any") ? education : [req.body.user.profile.education];
    var kids = [req.body.user.profile.kids] || [false, true];

    var order = (req.body.sort !== "distance") ? [[User.associations.Profile, req.body.sort]] : [[User.associations.Profile, Profile.associations.Location, "distance"]];
    var lastSort = req.body.sort || "age";

    User.findAll({
      include: [
        {
          model: Profile,
          include: [
	          { 
	          	model: Location, 
	          	where: { 
	          		distance: {
	          			$lt: req.body.user.profile.location.distance
	          		}
            	}
	          }
	        ],
          where: {
            gender: {
              $in: gender
            },
            age: {
              $between: [req.body.user.profile.ageMin, req.body.user.profile.ageMax]
            },
            maritalStatus: {
              $in: status
            },
            height: {
             $between: [req.body.user.profile.heightMin, req.body.user.profile.heightMax]
            },
            bodyType: {
              $in: bodyT
            },
            pets: {
              $contains: [req.body.user.profile.pets]
            },
            education: {
              $in: education
            },
            kids: {
              $in: kids
            }
          }
        }
      ],
      where: {
        email: {
          $ne: req.session.currentUser.email
        }
      },
      order: order
    }).then(users => {
      var search = req.body.user.profile;
      res.render("search/index", { users, search, lastSort });
    });
  });

  return router;
};