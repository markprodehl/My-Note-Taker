const fs = require("fs");
const path = require('path');
const DB_PATH = path.join(__dirname, '../db/db.json')

module.exports = function(app) {

    // GET is retrieving data from my db.json (DB_PATH)file
    app.get("/api/notes", function(req, res) {
        try {
            const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
            res.json(data);

            // var db = fs.readFileSync(DB_PATH, "utf8");
            // res.json(JSON.parse(db));
        } catch (error) {
            res.sendStatus(500)
        }
    })

    // GET is deleting from my db_json file
    app.delete("/api/notes/:id", function(req, res) {
        // DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
        console.log(typeof req.params.id, req.params.id);
        try {
            const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

            // filter each element in data
            // ensure to parse req.params.id to int for === comparison
            // if the element has the same id, do not pass to new array
            // if the element has different id, then pass to new array
            const new_data = data.filter(el => el.id !== parseInt(req.params.id))

            fs.writeFileSync(DB_PATH, JSON.stringify(new_data))

            res.json(new_data)

        } catch (error) {
            res.sendStatus(500)
        }
    })

    // POST is adding files to my db_json file
    app.post("/api/notes", function(req, res) {

        try {
            const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
            let newId;
            if (data.length > 0) {
                newId = data[data.length - 1].id + 1;
            } else {
                newId = 1;
            }
            data.push({
                ...req.body,
                id: newId
            });
            fs.writeFileSync(DB_PATH, JSON.stringify(data))
            res.json(data)
        } catch (error) {
            res.sendStatus(500)
        }

        // var newNote = req.body;

        // var data = fs.readFileSync(DB_PATH, "utf8");
        // data = JSON.parse(data)

        // newNote.id = data[data.length - 1].id + 1
        // data.push(newNote);

        // var noteJSON = JSON.stringify(data);

        // fs.writeFile(DB_PATH, noteJSON, "utf8", err => {
        //     if (err) throw err;

        //     res.json(data)
        // });


    });
}

//Filter and Map practice
// const newArr = [0, 1, 2, 3].map(el => el.toString())
// const newArr = [0, 1, 2, 3].map(el => {
//     if (el < 2) {
//         return el
//     }
// })
// const origin = [0, 1, 2, 3]
// const newArr = origin.filter(el => el < 2).map(el => el.toString())

// console.log(newArr, origin)