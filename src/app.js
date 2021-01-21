const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { title } = require("process");
const geocode = require("./utils.js/geocode");
const forecast = require("./utils.js/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../.."));

const app = express();
const port = process.env.PORT || 3001;

//Defined paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Luis Ruiz",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Luis Ruiz",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "What can I help you with ",
    name: "Luis Ruiz",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error: error });

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error: error });

        res.send({
          location,
          forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Luis Ruiz",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Luis Ruiz",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
