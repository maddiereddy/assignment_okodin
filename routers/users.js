var express = require('express');
var router = express.Router();
var models = require('./../models');
var User = models.User;
var Profile = models.Profile;
var Location = models.Location;
var sequelize = models.sequelize;
var db = require('./../models/index');


// ----------------------------------------
// Index
// ----------------------------------------
router.get('/', (req, res) => {
  User.findAll({
    where: {
      email: {
        $ne: req.session.currentUser.email
      }
    },
    include: [{ model: Profile }],
    limit: 50
  })
  .then(users => {
     res.render('users/index', { users });
  })
  .catch(e => res.status(500).send(e.stack));
});

router.get("/edit", (req, res) => {
  User.find({
    where: {
      username: req.session.currentUser.username,
      email: req.session.currentUser.email
    },
    include: [{ model: Profile, include: [{ model: Location}] }]
  })
  .then(user => {
    res.render("users/edit", { user });
  });
});

router.get("/:id", (req, res) => {
	let canEdit = false;
  let user;

  User.find({
    where: {
      id: req.params.id
    },
    include: [{ model: Profile, include: [{ model: Location}] }]
  }).then(viewee => {
    user = viewee;

    User.find({
      where: {
        email: req.session.currentUser.email
      },
      include: [{model: Profile}]
    }).then(viewer => {
      // add user id to viewer's views array
      var newArray = viewer.Profile.views;
      newArray.push(user.id);

      // and, add viewer's user id to the viewee's viewedBy array
      var viewedByArray = user.Profile.viewedBy;
      viewedByArray.push(viewer.id);

      Profile.update(
      {
        views: newArray,
        viewedBy: viewedByArray
      },
      {
        where: { id: viewer.profileId }
      }).then(() => {
        Profile.update(
        {
          viewedBy: viewedByArray
        },
        {
          where: { id: user.profileId }
        })
      });
    });
  }).then(() => {
    if (user.id !== null && user.id === req.session.currentUser.id) canEdit = true;
    res.render("users/show", { user, canEdit });
  });
});

router.put('/:id', (req, res) => {
  
});

module.exports = router;