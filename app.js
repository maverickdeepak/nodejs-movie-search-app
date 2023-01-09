const express = require("express");
// const path = require("path");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: true }));

// middleware
app.use(express.static(__dirname + "/public"));

const api_key = process.env.API_KEY;

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.post("/search", async (req, res) => {
  try {
    const search = req.body.search;
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${search}`
    );
    const data = await response.data.results;
    console.log(data);
    res.render("movies.ejs", { data: data, searchTerm: search });
  } catch (error) {
    console.log(error);
  }
});

app.listen(8800, () => {
  console.log("server is running at port 8800");
});
