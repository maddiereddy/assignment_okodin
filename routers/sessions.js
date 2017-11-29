var url = require('url');
var express = require('express');
var router = express.Router();
var models = require('./../models');
var User = models.User;
var sequelize = models.sequelize;



module.exports = (app) => {

  // Auth
  app.use((req, res, next) => {
    var reqUrl = url.parse(req.url);
    if (!req.session.currentUser &&
        !['/', '/login', '/sessions'].includes(reqUrl.pathname)) {
      res.redirect('/login');
    } else {
      next();
    }
  });


  // New
  var onNew = (req, res) => {
    if (req.session.currentUser) {
      // finds current user's profile and redirects them there
      User.findOne({
        where: {
          id: req.session.currentUser.id
        }
      })
      .then(user => {
          res.redirect('/users');
        })
        .catch(e => res.status(500).send(e.stack));
      
    } else {
      res.render('sessions/new');
    }
  };
  router.get('/', onNew);
  router.get('/login', onNew);


  // Create
  router.post('/sessions', (req, res) => {
    User.findOne({
      where: {
        username: req.body.username,
        email: req.body.email
      }
    })
    .then((user) => {
      if (user) {
        req.session.currentUser = {
          username: user.username,
          email: user.email,
          id: user.id,
          _id: user._id
        };
        req.flash('success', 'Welcome back!');
        res.redirect('/users');
      } else {
        req.flash('error', 'Error: User could not be found.');
        res.redirect('/login');
      }
    })
    .catch((e) => res.status(500).send(e.stack));
  });


  // Destroy
  var onDestroy = (req, res) => {
    req.session.currentUser = null;
    res.redirect('/login');
  };
  router.get('/logout', onDestroy);
  router.delete('/logout', onDestroy);

  return router;
};
