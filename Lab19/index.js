// Importar express

const express = require('express');
const app = express();

// Definir el motor de plantillas

app.set('view engine', 'ejs');

// Definir la carpeta de las plantillas

app.set('views', 'views');

// Sesion

const session = require('express-session');
app.use(session({
  secret: 'booo secretooooooooo booo',
  resave: false, // La sesión no se vuelve a guardar si no hay cambios, solo si hay cambios
  saveUninitialized: false // No se guarda la sesión si no se inicializa
}));

// Definir la carpeta de los archivos estáticos

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Definir el middleware para procesar los datos de las peticiones, como el body-parser

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// Cookie parser (para manejar cookies)

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Protección contra CSRF (Cross-Site Request Forgery)

const csrf = require('csurf', {cookie: true});
const csrfProtection = csrf();

app.use(csrfProtection);

// Definir las rutas para el manejo de los usuarios

const rutasUsuarios = require('./routes/users.routes');
app.use('/users', rutasUsuarios);

// Definir las rutas para el manejo de las clases

const rutasClases = require('./routes/cultivos.routes');
app.use('/', rutasClases);

// Si no se encuentra la ruta, se manda un error 404

app.use((req, res, next) => {
  res.status(404);
  res.render('404')
});

// Iniciar el servidor

app.listen(3000);
