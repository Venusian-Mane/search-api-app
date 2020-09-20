const express = require("express");
const app = express();
const file = require("fs");
const async = require("express-async-await");
const fetch = require("node-fetch");
const dataFile = require("./favourites.json");
const helmet = require("helmet");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.get("/results", function (req, res) {
  console.log("Getting results data");
  file.readFile("./searchResults.json", (err, data) => {
    console.log(data);
    if (err)
      res.json({
        message: "This file does not exist. Please try something else",
      });
    else res.json({ message: `${data}` });
  });
});

app.get("/favourites", function (req, res) {
  console.log("Getting favourites data");
  file.readFile("./favourites.json", (err, data) => {
    if (err)
      res.json({
        message:
          "This file and its data does not exist. Please try something else",
      });
    else res.json({ message: `${data}` });
  });
});

app.post("/search", function (req, res) {
  const fetching = async () => {
    var body = req.body.usedState;
    const apiURL = `https://itunes.apple.com/search?${body[0]}&${body[1]}&${body[2]}&${body[3]}`;
    const fetchResponse = await fetch(apiURL);
    const jsonResponse = await fetchResponse.json();
    const newFetch = await JSON.stringify(jsonResponse);
    file.writeFile("./searchResults.json", newFetch, (err) => {
      if (err) throw err;
    });
  };
  console.log("Posting app data");
  fetching();
  res.send("file created");
});

app.post("/favourites", (req, res) => {
  console.log("Updating favourites");
  var body = req.body.item;
  var favouritesList = dataFile.favourites;
  for (var i = 0; i < body.length; i++) {
    for (var j = 0; j < favouritesList.length; j++) {
      if (body[i].trackName == favouritesList[j].trackName) {
        favouritesList.splice(j, 1);
        console.log("deleted");
      }
    }
  }
  var newDataFile = JSON.stringify(dataFile);
  file.writeFile("./favourites.json", newDataFile, (err) => {
    if (err) throw err;
    res.send("favourites file is updated");
  });
});

app.post("/results", (req, res) => {
  var body = req.body.item;
  var favouritesList = dataFile.favourites;
  body.map((trackItem) => {
    favouritesList.push(trackItem);
  });
  favouritesList.push(req.body.item);
  const newDataFile = JSON.stringify(dataFile);
  file.writeFile("./favourites.json", newDataFile, (err) => {
    if (err) throw err;
    res.send("File updated!");
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  // port 8080 will be litening for any requests
  console.log(`Server is listening on port ${PORT}`);
});
