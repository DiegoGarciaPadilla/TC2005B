const express = require('express');

const bodyParser = require('body-parser');

const app = express();

// Configurar body-parser

app.use(bodyParser.urlencoded({ extended: false }));

// Configurar pug

app.set('view engine', 'pug');

// Rutas

const rutas = require('./rutas');

// Usar rutas

app.use('/', rutas);

// Levantar el servidor

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
