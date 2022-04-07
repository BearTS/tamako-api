const express = require('express');
const path = require('path');
// const rateLimit = require('express-rate-limit');
require('dotenv').config();
require('./resources/fonts');

// eslint-disable-next-line no-unused-vars
const { handleNotFound, handleInternalError } = require('./middleware/errorHandler');

// Main App
const app = express();

// Middlewares
app.set('trust proxy', 1);
app.set('json spaces', 2);

// Express App Configuration 

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, '../public/')));
app.set('views', path.join(__dirname, '../public/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Main route
app.use('/', require('./routes/index'));

// Back Middlewares
// App configurations
app.use(handleNotFound);
// app.use(authorize);
app.use(handleInternalError);

// App Listener Event
app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on Port ${process.env.PORT || 3000}`);
});