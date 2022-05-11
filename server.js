const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const path = require("path");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");

// Express.js session and connect it to our sequelize database
const sess = {
  secret: process.env.DB_SECRET,
  cookie: {},
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 1000 * 60 * 10, // will check every 10 minutes
    expiration: 1000 * 60 * 30 // will expire after 30 minutes
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

// this is setting up Handlebars.js as our app's template engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));
// express.static is a built-in Express.js middleware function
// it can take all the contents of a folder and serve them as static assets
app.use(express.static(path.join(__dirname, "public")));
// turn on routes
app.use(routes);
// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('App now listening on PORT 3001!'));
});
