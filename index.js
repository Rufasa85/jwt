const express = require('express');
const allRoutes = require('./controllers');

const sequelize = require('./config/connection');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;
// Requiring our models for syncing
const { User} = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/',allRoutes);

sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});