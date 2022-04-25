const express = require('express');
const path = require('path');
const xss = require('xss-clean');
const cors = require('cors');
const favicon = require('serve-favicon');

// Global Vars
require('dotenv').config();
require('./resources/fonts');

// Main App
const app = express();

// Middlewares
// eslint-disable-next-line no-unused-vars
const { handleNotFound, handleInternalError } = require('./middleware/errorHandler');

// Express App Configuration 
app.disable('x-powered-by');
app.use(xss());
app.use(cors());
app.set('trust proxy', 1);
app.set('json spaces', 2);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.engine('html', require('ejs').renderFile);

app.use(favicon(path.resolve('public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../public/')));
app.set('views', path.join(__dirname, '../public/views'));
app.set('view engine', 'html');

// Main route
app.use('/', require('./routes/index'));

function log(req, res) {
    console.log(req.path);
}

app.use(log);

// Back Middlewares
// App configurations
app.use(handleNotFound);
// app.use(authorize);
app.use(handleInternalError);

// App Listener Event
app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on Port ${process.env.PORT || 3000}`);
});