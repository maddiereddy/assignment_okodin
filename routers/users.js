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
    include: [{ model: Profile }],
    limit: 50
  })
  .then(users => {
     res.render('users/index', { users });
  })
  .catch(e => res.status(500).send(e.stack));
});

module.exports = router;