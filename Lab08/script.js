//fs es el módulo con las funciones para MANIPULAR sistema de archivos

const filesystem = require("fs");

filesystem.writeFileSync("hola.txt", "Hola desde node");

// FUNCIÓN 1. Recibe un arreglo de números y devuelve el promedio

const average = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
};

vector = [10, 20, 30, 40, 50];

console.log(average(vector));

// FUNCIÓN 2. Recibe string y lo escribe en archivo de texto

const writeFile = (nombre_archivo, string) => {
  filesystem.writeFileSync(nombre_archivo, string);
  return "Se creó el archivo y escribió la frase";
};
console.log(writeFile("hola.txt", "Hola desde node 2"));

// FUNCIÓN 3. Recibe un número y devuelve el factorial
const factorial = (numero) => {
  let acum = 1;
  for (let i = 1; i <= numero; i++) {
    acum *= i;
  }
  return acum;
};
console.log(factorial(5));

const http = require("http");
// Escrito en paradigma FUNCIONAL
// Escucha las peticiones de HTTP en el PUERTO 3000
// Puede ser cualquier puerto mientras no esté ocupado
const server = http
  .createServer((request, response) => {
    console.log(request.url);
    response.setHeader("Content-Type", "text/html"); // Navegador se prepara para recibir HTML

    response.write(`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link type="image/png" sizes="32x32" rel="icon" href="./favicon.png" />
    <link rel="stylesheet" href="./style.css" />
    <title>Lab 08</title>
  </head>
  <body>
    <header>
      <h1>Lab 08</h1>
    </header>
    <div class="two-col">
      <section>
      </section>
      <aside>
        <h2>About me.</h2>
        <article>
          <h3>Diego Antonio García Padilla</h3>
          <p>
            Estudiante de la carrera de Ingeniería en Tecnologías
            Computacionales en el Tecnológico de Monterrey, Campus Querétaro.
          </p>
          <ul>
            <li>Presidente de la SEITC.</li>
            <li>
              Inscrito en el Eugenio Garza Sada Global Leadership Program.
            </li>
            <li>Mentor en el programa Peer Mentor.</li>
          </ul>
          <h4>Datos de contacto</h4>
          <ul>
            <li><strong>Correo:</strong> A01710777@tec.mx</li>
            <li><strong>Teléfono:</strong> +52 55 1368 1749</li>
          </ul>
        </article>
      </aside>
    </div>
    <footer>
      <div>
        <p>
          Este sitio fue escrito en
          <a href="https://code.visualstudio.com/">VSCode.</a>
        </p>
      </div>
      <div>
        <p>Diego Antonio García Padilla (A01710777)</p>
      </div>
    </footer>
  </body>
</html>

    `);

    response.end(); // return  --> se detiene la carga de la página
  })
  .listen(3000);
// Lo mismo que --> server.listen(3000);
