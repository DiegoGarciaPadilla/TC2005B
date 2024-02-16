// Entrada: un número pedido con un prompt. 
// Salida: Una tabla con los números del 1 al número dado con sus cuadrados y cubos.
// Utiliza document.write para producir la salida

// Pedir un número
let numero1 = prompt("Ingrese un número");

document.write("<article>");
document.write("<h2>1. Tabla de cuadrados y cubos</h2>");
document.write("<table>");
document.write("<tr>");
document.write("<th>Número</th>");
document.write("<th>Cuadrado</th>");
document.write("<th>Cubo</th>");
document.write("</tr>");

for (let i = 1; i <= numero1; i++) {
    document.write("<tr>");
    document.write("<td>" + i + "</td>");
    document.write("<td>" + i * i + "</td>");
    document.write("<td>" + i * i * i + "</td>");
    document.write("</tr>");
}

document.write("</table>");
document.write("</article>");

// Entrada: Usando un prompt se pide el resultado de la suma de 2 números 
// generados de manera aleatoria. 
// Salida: La página debe indicar si el resultado fue correcto o incorrecto, 
// y el tiempo que tardó el usuario en escribir la respuesta.

random1 = Math.floor(Math.random() * 10);
random2 = Math.floor(Math.random() * 10);

let tiempoInicio = new Date();

let suma = prompt("¿Cuánto es " + random1 + " + " + random2 + "?");

let tiempoFinal = new Date();

let tiempo = tiempoFinal - tiempoInicio;

let textoResultado = suma == random1 + random2 ? "correcto" : "incorrecto";

document.write("<article>");
document.write("<h2>2. Suma de números aleatorios</h2>");
document.write("<p>El resultado fue <strong>" + textoResultado + "</strong></p>");
document.write("<p>Tiempo de respuesta: <strong>" + tiempo + "</strong> milisegundos</p>");
document.write("</article>");

// Función: contador. 
// Parámetros: Un arreglo de números. 
// Regresa: La cantidad de números negativos en el arreglo, la cantidad de 0's, 
// y la cantidad de valores mayores a 0 en el arreglo.

const contador = (arreglo) => {
    let negativos = 0;
    let ceros = 0;
    let positivos = 0;

    for (let i = 0; i < arreglo.length; i++) {
        if (arreglo[i] < 0) {
            negativos++;
        } else if (arreglo[i] == 0) {
            ceros++;
        } else {
            positivos++;
        }
    }

    return [negativos, ceros, positivos];
}

let arreglo = [-3, 0, 2, 4, 0, -1, 5, -2, 0, 3];
let resultado = contador(arreglo);

document.write("<article>");
document.write("<h2>3. Contador de números</h2>");
document.write("<p>El arreglo es <strong>[" + arreglo.toString() + "]</strong></p>");
document.write("<p>Negativos: <strong>" + resultado[0] + "</strong></p>");
document.write("<p>Ceros: <strong>" + resultado[1] + "</strong></p>");
document.write("<p>Positivos: <strong>" + resultado[2] + "</strong></p>");
document.write("</article>");

// Función: promedios. 
// Parámetros: Un arreglo de arreglos de números. 
// Regresa: Un arreglo con los promedios de cada uno de los renglones de la matriz.

const promedios = (arreglo) => {
    let promedios = [];

    for (let i = 0; i < arreglo.length; i++) {
        let suma = 0;

        for (let j = 0; j < arreglo[i].length; j++) {
            suma += arreglo[i][j];
        }

        promedios.push(suma / arreglo[i].length);
    }

    return promedios;
}

let matriz = [
    [1, 2, 3, 4, 5],
    [10, 20, 30, 40, 50],
    [100, 200, 300, 400, 500]
];

let promedio = promedios(matriz);

document.write("<article>");
document.write("<h2>4. Promedios de una matriz</h2>");

document.write("<p>La matriz es: </p>");
document.write("<strong>");

for (let i = 0; i < matriz.length; i++) {
    document.write("<p>[" + matriz[i].toString() + "]</p>");
}

document.write("</strong>");
document.write("<p>Los promedios son <strong>[" + promedio.toString() + "]</strong></p>");

document.write("</article>");

// Función: inverso. 
// Parámetros: Un número. 
// Regresa: El número con sus dígitos en orden inverso.

const inverso = (numero) => {
    return parseInt(numero.toString().split("").reverse().join(""));
}

let numero2 = 12345;
let numeroInverso = inverso(numero2);

document.write("<article>");
document.write("<h2>5. Número inverso</h2>");
document.write("<p>El número <strong>" + numero2 + "</strong> invertido es <strong>" + numeroInverso + "</strong></p>");
document.write("</article>");

// Crea una solución para un problema de tu elección (puede ser algo relacionado 
// con tus intereses, alguna problemática que hayas identificado en algún ámbito, 
// un problema de programación que hayas resuelto en otro lenguaje, un problema de la ACM, 
// entre otros). El problema debe estar descrito en un documento HTML, y la solución 
// implementada en JavaScript, utilizando al menos la creación de un objeto, 
// el objeto además de su constructor deben tener al menos 2 métodos. 
// Muestra los resultados en el documento HTML.

document.write("<article>");
document.write("<h2>6. Problema de programación</h2>");
document.write("<p>El problema es el siguiente: </p>");
document.write("<p>Crear un objeto que represente un cajero automático. El cajero debe tener un saldo inicial, y permitir retirar y depositar dinero. Además, debe llevar un registro de los movimientos realizados.</p>");

class Cajero {
    constructor(saldoInicial) {
        this.saldo = saldoInicial;
        this.movimientos = [];
    }

    depositar(cantidad) {
        this.saldo += cantidad;
        this.movimientos.push("Depósito de " + cantidad);
    }

    retirar(cantidad) {
        if (cantidad <= this.saldo) {
            this.saldo -= cantidad;
            this.movimientos.push("Retiro de " + cantidad);
        } else {
            this.movimientos.push("No hay saldo suficiente para retirar " + cantidad);
        }
    }
}

const handleClick = () => {
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let operacion = document.getElementById("operacion").value;

    if (operacion == "depositar") {
        cajero.depositar(cantidad);
    } else {
        cajero.retirar(cantidad);
    }

    document.getElementById("saldo").innerHTML = cajero.saldo;
    document.getElementById("movimientos").innerHTML = cajero.movimientos.join("<br>");
}

let cajero = new Cajero(1000);

document.write("<h4>Depositar o retirar dinero: </h4>");

document.write("<p>El saldo del cajero es <strong id='saldo'>" + cajero.saldo + "</strong></p>");
document.write("<p>Los movimientos realizados son: </p>");
document.write("<p><strong id='movimientos'>" + cajero.movimientos.join("<br>") + "</strong></p>");

document.write("<h4>Realizar una operación: </h4>");

document.write("<div class='cols'>");

document.write("<label for='cantidad'>Cantidad: </label>");
document.write("<input type='number' id='cantidad'>");

document.write("<select id='operacion'>");
document.write("<option value='depositar'>Depositar</option>");
document.write("<option value='retirar'>Retirar</option>");
document.write("</select>");

document.write("<button onclick='handleClick()'>Realizar operación</button>");

document.write("</div>");