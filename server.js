// import express 
const express = require("express");
const fs = require("fs");
const path = require("path");

// Initialize the express server app
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing to receive data (POST)
// need to call them before everything 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let lastId = 2;
// create an array of notes
const notes = [{
        title: "Pup walk",
        text: "Take the puppy to the park",
        is_complete: false,
        id: 1,
    },
    {
        title: "Homework",
        text: "Get your homework done before Friday",
        is_complete: false,
        id: 2,
    },
];

// Routing to HTML pages
// * GET `*` - will  return the `index.html` file
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// * GET `/notes` - will return the `notes.html` file.
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


// app.get("/api/notes", (req, res) => {
//     return res.json(notes);
// });

app.get("/api/notes", function(req, res) {
    var db = fs.readFileSync("./db/db.json", "utf8");
    return res.json(JSON.parse(db));
})


app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    // add 1 to the last id and assign that to the newNote
    lastId += 1;
    newNote.id = lastId;
    console.log(newNote);
    // add the newNote to to our array of notes

    notes.push(newNote); // ** HOW DO I PUSH THE NEW NOTE INTO THE db.json file?
    // include newNote to json in the response
    res.json(newNote);
});





app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});