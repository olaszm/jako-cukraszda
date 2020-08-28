const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const db = require(path.join(__dirname, "/db.json"));

app.use(express.static(path.join(__dirname, "/public")));

app.use(cors());

app.use(bodyParser.json());

const PORT = 3000;
const galleryRoutes = [
  { name: "weddingCakes" },
  { name: "bdayCakes" },
  { name: "specialCakes" },
  { name: "cakes" },
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/rolunk.html"));
});

app.get("/order", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/order.html"));
});

app.get("/product", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/termekeink.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/contact.html"));
});

app.get("/gallery/:name", (req, res) => {
  const { name } = req.params;
  const route = galleryRoutes.filter((r) => r.name === name)[0];
  if (route) {
    res.sendFile(path.join(__dirname, "/public/gallery.html"));
  } else {
    res.sendFile(path.join(__dirname, "/public/404.html"));
  }
});

app.get("/api/:name", (req, res) => {
  const { name } = req.params;
  const data = db[name];
  res.json(data);
});

app.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname + "/public/404.html"));
});

app.listen(process.env.PORT || PORT, () => {
  console.log("App is Listening");
});
