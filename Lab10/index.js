const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Florida Man</title>
        </head>
        <body>
            <header><h1>Florida Man</h1></header>
            <section>
                <p>¿Quieres saber que rancia noticia de Florida ocurrió el día de tu cumpleaños?</p>
                <form action="/ingresa-cumpleanos" method="post">
                    <button onclick="SubmitEvent">¡Claro que sí!</button>
                </form>
            </section>
        </body>
        </html>
        `);
    }
    else if (req.url === "/ingresa-cumpleanos") {
        res.setHeader("Content-Type", "text/html");
        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Florida Man</title>
        </head>
        <body>
            <header><h1>Florida Man</h1></header>
            <section>
                <p>Ingresa tu día y mes de nacimiento para saber que rancia noticia de Florida ocurrió el día de tu cumpleaños</p>
                <form action="/noticia" method="post">
                    <input type="date" id="fecha" name="fecha" required>
                    <button type="submit">¡Claro que sí!</button>
                </form>
            </section>
        </body>
        </html>
        `);
    }
    else if (req.url === "/noticia" && req.method === "POST") {

        const datos = [];

        req.on("data", (dato) => {
            datos.push(dato);
        });

        req.on("end", () => {
            const datos_completos = Buffer.concat(datos).toString();
            const fecha = datos_completos.split("=")[1];
            const dia = String(fecha.split("-")[2]).replace(/^0+/, '');
            const mes = fecha.split("-")[1];

            const meses = {
                "01": "january",
                "02": "february",
                "03": "march",
                "04": "april",
                "05": "may",
                "06": "june",
                "07": "july",
                "08": "august",
                "09": "september",
                "10": "october",
                "11": "november",
                "12": "december"
            };
            

            const url = `https://floridamanbirthday.org/${meses[mes]}-${dia}`;
            res.writeHead(302, { "Location": url });
            res.end();

            
        });
    }
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<h1>404 Not Found</h1>");
        res.end();
    }

});

server.listen(3000);
