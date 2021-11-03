const express = require("express");
const path = require("path")
const apiRouter = require('./routes/routes');

const app = express()
app.use(express.static(path.join(__dirname, "../public/")));
app.use('/api', apiRouter);
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../public/404.html"));
})
app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on Port ${process.env.PORT || 3000}`)
})