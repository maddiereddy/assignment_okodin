var express = require("express");
var router = express.Router();
var models = require("./../models");
var User = models.User;
var Profile = models.Profile;
var sequelize = models.sequelize;

module.exports = app => {

  router.get("/views", (req, res) => {
    User.find({
      where: {
        email: req.session.currentUser.email
      },
      include: [{model: Profile}]
    }).then(userMe => {
      User.findAll({
        where: {
          email: {
            $ne: userMe.email
          },
          profileId: userMe.Profile.views
        },
        include: [{model: Profile}]
      }).then(users => {
        var title = "All profiles I have viewed"
        res.render("views/index", { users, title });
      });
    });
  });

  router.get("/viewedBy", (req, res) => {
    User.find({
      where: {
        email: req.session.currentUser.email
      },
      include: [{model: Profile}]
    }).then(userMe => {
      User.findAll({
        where: {
          email: {
            $ne: userMe.email
          },
          profileId: userMe.Profile.viewedBy
        },
        include: [{model: Profile}]
      }).then(users => {
        var title = "All profiles who have viewed me"
        res.render("views/index", { users, title });
      });
    });
  });

  router.get("/likes", (req, res) => {
    User.find({
      where: {
        email: req.session.currentUser.email
      },
      include: [{model: Profile}]
    }).then(userMe => {
      User.findAll({
        where: {
          email: {
            $ne: userMe.email
          },
          id: userMe.Profile.likes
        },
        include: [{model: Profile}]
      }).then(users => {
        res.render("likes/index", { users });
      });
    });
  });

  router.get("/likeUser/:userId", (req, res) => {
    User.find({
      where: {
        email: req.session.currentUser.email
      },
      include: [{model: Profile}]
    }).then(userMe => {
      var newArray = userMe.Profile.likes;
      newArray.push(req.params.userId);
      Profile.update(
        {
          likes: newArray
        },
        {
          where: {
            id: userMe.profileId
          }
        }
      ).then(() => {
        res.redirect("back");
      });
    });
  });
  return router;
};