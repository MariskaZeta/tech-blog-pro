const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const path = require("path");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

// Express.js session and connect it to our sequelize database
const sess = {
  secret: process.env.DB_SECRET,
  cookie: {
    expires: 60 * 1000 * 10
  },
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

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
sequelize.sync();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
