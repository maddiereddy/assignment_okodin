var express = require('express');
var app = express();


// ----------------------------------------
// Body Parser
// ----------------------------------------
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// ----------------------------------------
// Sessions/Cookies
// ----------------------------------------
var cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['asdf1234567890qwer']
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.currentUser = req.session.currentUser;
  if (req.session.currentUser) {
    res.locals.userid = req.session.currentUser.id;
  }

  next();
});


// ----------------------------------------
// Flash Messages
// ----------------------------------------
var flash = require('express-flash-messages');
app.use(flash());


// ----------------------------------------
// Method Override
// ----------------------------------------
const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');
 
 
app.use(methodOverride(
  getPostSupport.callback,
  getPostSupport.options // { methods: ['POST', 'GET'] } 
));


// ----------------------------------------
// Referrer
// ----------------------------------------
app.use((req, res, next) => {
  req.session.backUrl = req.header('Referer') || '/';
  next();
});


// ----------------------------------------
// Public
// ----------------------------------------
app.use(express.static(`${__dirname}/public`));


// ----------------------------------------
// Logging
// ----------------------------------------
var morgan = require('morgan');
var morganToolkit = require('morgan-toolkit')(morgan);

app.use(morganToolkit());


// ----------------------------------------
// Routes
// ----------------------------------------
var sessionsRouter = require('./routers/sessions')(app);
app.use('/', sessionsRouter);

var usersRouter = require('./routers/users');
app.use('/users', usersRouter);

var searchRouter = require("./routers/search")(app);
app.use("/search", searchRouter);

var viewsRouter = require("./routers/views")(app);
app.use("/views", viewsRouter);


// ----------------------------------------
// Template Engine
// ----------------------------------------
var expressHandlebars = require('express-handlebars');
var helpers = require('./helpers');
//var searchHelper = require('./helpers/search-helper');


var hbs = expressHandlebars.create({
  helpers: helpers,
  partialsDir: 'views/',
  defaultLayout: 'application'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// ----------------------------------------
// Server
// ----------------------------------------
var port = process.env.PORT ||
  process.argv[2] ||
  3000;
var host = 'localhost';


var args;
process.env.NODE_ENV === 'production' ?
  args = [port] :
  args = [port, host];


args.push(() => {
  console.log(`Listening: http://${ host }:${ port }`);
});


app.listen.apply(app, args);

module.exports = app;