//application dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

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
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//app.get to get request through our server notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//use GET to request the API notes/ GET from db.json
app.get("/api/notes", (req, res) => {
  //'fs' to read file from db folder where users data is saved
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  //title, text and id that will be inputted and saved from user
  var createNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  //fs to readfile and added to HTML to display current note
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    var dataNotes = JSON.parse(data);
    dataNotes.push(createNote);
    fs.writeFile("db/db.json", JSON.stringify(dataNotes), (err) => {
      err ? console.log(err) : console.log("Created new note");
    });
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
});
// REQUEST DELETE  to delete note from the server
app.delete("/api/notes/:id", (req, res) => {
  var deleteNote = req.params.id;
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    var database = JSON.parse(data);
    var newNote = database.filter((note) => note.id !== deleteNote);
    fs.writeFile("db/db.json", JSON.stringify(newNote), (err) => {
      err ? console.log(err) : console.log("Deleted note");
    });
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
});
//Server will listen at this port
app.listen(PORT, () => {
  console.log(`API server now on port http://localhost:${PORT}`);
});
