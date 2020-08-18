const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "/public")));

// app.get("*", (req, res) => {
//   res.sendFile(__dirname + `/public/index.html`);
// });

const PORT = 3000;
const galleryRoutes = [
  { name: "wedding-cake" },
  { name: "bday-cake" },
  { name: "events" },
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
  console.log(__dirname);
  if (route) {
    res.sendFile(path.join(__dirname, "/public/gallery.html"));
  } else {
    res.sendFile(path.join(__dirname, "/public/404.html"));
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log("App is Listening");
});
