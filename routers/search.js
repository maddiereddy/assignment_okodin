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
    User.findAll({
      include: [
        {
          model: Profile,
          include: [{ model: Location }],
          where: {
            gender: req.body.user.profile.gender,
            age: {
              $lt: req.body.user.profile.age
            },
            locationDistance: {
              $lt: req.body.user.profile.locationDistance
            },
            height: {
              $and: [
                {
                  $gte: req.body.user.profile.heightMin
                },
                {
                  $lte: req.body.user.profile.heightMax
                }
              ]
            },
            pets: {
              $contains: req.body.user.profile.pets
            }
          }
        }
      ],
      where: {
        email: {
          $ne: req.session.currentSession.email
        }
      },
      order: [[User.associations.Profile, req.body.sort, "DESC"]]
    }).then(users => {
      //users = userFiltering(req.body.user.profile, users);
      var search = req.body.user.profile;
      res.render("search/index", { users, search });
    });
  });

  return router;
};