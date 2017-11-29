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

  User.find({
    where: {
      id: req.params.id
    },
    include: [{ model: Profile, include: [{ model: Location}] }]
  })
  .then(user => {
  	if (user.id !== null && user.id === req.session.currentUser.id) canEdit = true;
	  res.render("users/show", { user, canEdit });
	});
});

router.put('/:id', (req, res) => {
  
});

module.exports = router;