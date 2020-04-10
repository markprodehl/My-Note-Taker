const path = require("path");

module.exports = function(app) {
    // Routing to HTML pages
    // * GET `*` - will  return the `index.html` file if there is no route found
    // ./ <= same directory
    // ../ <= up one level in directory
    // ../../ <= up two directory levels etc.

    // app.get("/", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/index.html"));
    // });

    // * GET `/notes` - will return the `notes.html` file.
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("/assets/css/styles.css", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"));
    });

    app.get("/assets/js/index.js", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/js/index.js"));
    });


    //add star * route last see video from class
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

}