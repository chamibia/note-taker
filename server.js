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

//app.get to request to our server the index.html file information

//Server will listen at this port
app.listen(PORT, () => {
  console.log(`API server now on port http://localhost:${PORT}`);
});
