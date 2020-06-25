const express = require("express");
const path = require("path");
const hbs = require("hbs");
const coordinates = require("./utils/geoCode");
const weather = require("./utils/foreCast");
//Start express
const app = express();

//For public static path
const publicPath = path.join(__dirname, "../public");
//Custom views path
const viewsPath = path.join(__dirname, "../src/templates/views");
//Partials path
const partialsPath = path.join(__dirname, "../src/templates/partials");
//Set viewengine
app.set("view engine", "hbs");

//set custom views path

app.set("views", viewsPath);
//setup handlebars
hbs.registerPartials(partialsPath);
//set static path
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    description: "Partly cloudy",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "We are ready to help you",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide a valid address",
    });
  }
  //Start querying...
  coordinates.geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      weather.foreCast(
        latitude,
        longitude,
        (error, { description, temperature } = {}) => {
          if (error) {
            return res.send({
              error,
            });
          }
          res.send({
            location,
            temperature,
            description,
            latitude,
            longitude,
          });
        }
      );
    }
  );
});
//about- other pages
app.get("/about/*", (req, res) => {
  res.render("404", {
    message: "Article not found",
  });
});
//For 404 pages
app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found",
  });
});
app.listen(3000, () => console.log("Its working..."));
