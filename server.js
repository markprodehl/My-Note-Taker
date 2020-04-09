// import express 
const express = require("express");

// Initialize the express server app
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing to receive data (POST)
// need to call them before everything 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let lastId = 2;
// create an array of todos
const notes = [{
        notes: "Take the puppy to the park",
        is_complete: false,
        id: 1,
    },
    {
        text: "Get your homework done before Friday",
        is_complete: false,
        id: 2,
    },
];

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});