//application dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

//install Express app
const app = express();
const PORT = process.env.PORT || 3000;

//Express to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//HTML Routes
//Sends user to page
//app.get to request to our server the index.html file information
app.get("/", (req, res) => {
  res.sendFile(path.join(_dirname, "/public/index.html"));
});

//app.get to get request through our server notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(_dirname, "/public/notes.html"));
});

//use GET to request the API notes/ GET from db.json
app.get("/api/notes", (req, res) => {
  //'fs' to read file from db folder where users data is saved
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    //title, text and id that will be inputted and saved from user
    let createNote = {
      title: req.body.title,
      text: req.body.text,
      id: req.params.id,
    };

    //fs to readfile and added to HTML to display current note
    fs.readFile("db/db.json", "utf-8", (err, data) => {
      if (err) throw err;
      const dataNotes = JSON.parse(data);
      dataNotes.push(createNote);
      fs.writeFile("db/db.json", JSON.stringify(dataNotes), (err) => {
        err ? console.log(err) : console.log("Created new note");
      });
      res.sendFile(path.join(_dirname, "/public/notes.html"));
    });
  });
});
// REQUEST DELETE  to delete note from the server
app.delete("api/notes/:id", (req, res) => {
  let deleteNote = req.params.id;
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    dataNotes.JSON.parse(data);
    //once deleted create a new note with variable and filter
    let newNote = dataNotes.filter((note) => note.id !== deleteNote);
    fs.writeFile("db/db.json", JSON.stringify(newNote), (err) => {
      err ? console.log(err) : console.log("Deleted note");
    });
    res.sendFile(path.join(_dirname, "/public/notes.html"));
  });
});
//Server will listen at this port
app.listen(PORT, () => {
  console.log(`API server now on port http://localhost:${PORT}`);
});
