const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
require('./fonts');
const apiRouter = require('./routes/api');
const canvasRouter = require('./routes/canvas');

const allowlist = ['::1'];

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 min
    max: process.env.rateLimit, // Limit each IP to rateLimit requests per windowMs
    standardHeaders: true, 
    legacyHeaders: false,
    skip: (request) => allowlist.includes(request.ip),
});

const app = express();
app.use(limiter);
app.use(express.static(path.join(__dirname, '../public/')));
app.use('/api', apiRouter);
app.use('/canvas', canvasRouter);
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});


app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on Port ${process.env.PORT || 3000}`);
});