const express = require('express');
const app = express();
const port = 50000;
const cors = require('cors');

app.use('/', (req, res, next) => {
    console.log("Base path...");
    next();
})
app.use('/hey', (req, res, next) => {
    console.log("the hey path!");
    res.json({you: "found the hey path!"});
})
app.listen(process.env.PORT || 50000, () => {
    console.log("Checkers server has started...")
})