var express = require('express');
var router = express.Router();
var models = require('./../models');
var User = models.User;
var Profile = models.Profile;
var Location = models.Location;
var sequelize = models.sequelize;
var db = require('./../models/index');
const { parseParams } = require('./../helpers/profile_helper');


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
  let profileParams = parseParams(req.body.user.profile);
  let city = req.body.user.profile.location.city;
  let state = req.body.user.profile.location.state;
  let userId = req.session.currentUser.id;

  sequelize.transaction(t => {
    return Profile.findOrCreate({
      default: profileParams,
      where: { userId: userId },
      transaction: t
    })
    .spread(profile => {
      return Profile.update(profileParams, {
        where: { id: profile.id },
        transaction: t
      });
    })
    .then(() => {
      return Location.findOrCreate({
        default: {
          city: city,
          state: state
        },
        where: { city: city, state: state},
        transaction: t
      });
    })
    .spread(location => {
      return Profile.update({locationId: location.id}, {
        where: {userId: userId},
        limit: 1,
        transaction: t
      });
    })
    .then(() => {
      res.redirect("/users/" + req.params.id);
    })
    .catch(e => {
      if (e.errors) {
        e.errors.forEach((err) => req.flash('error', err.message));
        res.redirect('back');
      } else {
        res.status(500).send(e.stack);
      }
    });
  });
  
});

module.exports = router;