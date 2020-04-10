// import express 
const express = require("express");

// Initialize the express server app
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing to receive data (POST)
// need to call them before everything 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app);
// Below does the same as above
// const htmlRoutes = require('./routes/htmlRoutes')
// htmlRoutes(app);

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});