const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

// Ruta para el home

router.get("/", (req, res, nxt) => {
  res.sendFile(__dirname + "/pages/index.html");
});

// Ruta para el about

router.get("/about", (req, res, nxt) => {
  res.sendFile(__dirname + "/pages/about.html");
});

// Ruta para services

router.get("/services", (req, res, nxt) => {
  res.sendFile(__dirname + "/pages/services.html");
});

// Ruta para precios

router.get("/pricing", (req, res, nxt) => {
  res.sendFile(__dirname + "/pages/pricing.html");
});

// Ruta para el contacto

router.get("/contact", (req, res, nxt) => {
  res.sendFile(__dirname + "/pages/contact.html");
});

// Imagenes

router.get("/logo", (req, res, nxt) => {
  res.sendFile(__dirname + "/images/WeRDevsLogo.svg");
});

router.get("/favicon", (req, res, nxt) => {
  res.sendFile(__dirname + "/images/favicon.svg");
});

// POST

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/contact-info", (req, res, nxt) => {
  console.log(req.body);
  res.write("<script>alert('Mensaje enviado');</script>");  
  res.redirect("/contact");
});

// Error 404

router.use((req, res, nxt) => {
  res.status(404).send("Error 404");
});

module.exports = router;
