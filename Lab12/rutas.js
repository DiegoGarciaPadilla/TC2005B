const express = require("express");

const pug = require("pug");

const bodyParser = require("body-parser");

const router = express.Router();

// Configurar body-parser

router.use(bodyParser.urlencoded({ extended: false }));

// Ruta para el home

router.get("/", (req, res, nxt) => {
  res.render(__dirname + '/pages/index.pug'); 
});

// Ruta para el about

router.get("/about", (req, res, nxt) => {
  res.render(__dirname + '/pages/about.pug');
});

// Ruta para services

router.get("/services", (req, res, nxt) => {
  res.render(__dirname + '/pages/services.pug');
});

// Ruta para precios

router.get("/pricing", (req, res, nxt) => {
  res.render(__dirname + '/pages/pricing.pug');
});

// Ruta para el contacto

router.get("/contact", (req, res, nxt) => {
  res.render(__dirname + '/pages/contact.pug');
});

// Imagenes

router.get("/logo", (req, res, nxt) => {
  res.sendFile(__dirname + "/images/WeRDevsLogo.svg");
});

router.get("/favicon", (req, res, nxt) => {
  res.sendFile(__dirname + "/images/favicon.svg");
});

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
