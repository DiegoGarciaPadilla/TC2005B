/* ELECCIÓN DE UNA BASE DE DATOS */
USE materiales;

/* CONSULTA DE UNA TABLA COMPLETA */
SELECT * 
FROM materiales;

/* SELECCIÓN */
SELECT * 
FROM materiales 
WHERE clave = 1000;

/* PROYECCIÓN */
SELECT clave, rfc, fecha 
FROM entregan;

/* REUNIÓN NATURAL */
SELECT * 
FROM materiales, entregan 
WHERE materiales.clave = entregan.clave;


/* REUNIÓN CON CRITERIO ESPECÍFICO */
SELECT * 
FROM entregan, proyectos 
WHERE entregan.numero <= proyectos.numero;

/* UNION */
SELECT * 
FROM entregan 
WHERE clave = 1450
UNION
SELECT *
FROM entregan 
WHERE clave = 1300;

/* UNIÓN (SIN USAR UNION) */
SELECT *
FROM entregan 
WHERE clave = 1450
OR clave = 1300;


/* INTERSECCIÓN */
SELECT clave
FROM entregan
WHERE numero = 5001
AND clave
IN (SELECT clave
        FROM entregan
        WHERE numero = 5018);

/* DIFERENCIA */
SELECT * 
FROM entregan 
WHERE clave != 1000;

/* PRODUCTO CARTESIANO */
SELECT *
FROM entregan, materiales;

/* CONSTRUCCIÓN DE CONSULTAS A PARTIR DE UNA ESPECIFICACIÓN */
SELECT descripcion
FROM materiales AS m
JOIN entregan AS e
ON m.clave = e.clave
WHERE YEAR(e.fecha) = 2000;

/* USO DEL CALIFICADOR DISTINCT */
SELECT DISTINCT descripcion
FROM materiales AS m
JOIN entregan AS e
ON m.clave = e.clave
WHERE YEAR(e.fecha) = 2000;

/* ORDENAMIENTOS */
SELECT p.numero, p.denominacion, e.fecha, e.cantidad
FROM proyectos AS p
JOIN entregan AS e
ON p.numero = e.numero
ORDER BY p.numero, e.fecha DESC;

/* USO DE EXPRESIONES */
SELECT descripcion, SUM(precio) + SUM(impuesto) AS "Total + Impuesto"
FROM materiales
GROUP BY descripcion;

/* OPERADORES DE CADENA */

/* LIKE */

SELECT * 
FROM materiales 
WHERE descripcion LIKE 'Si%';

SELECT * 
FROM materiales 
WHERE descripcion LIKE 'Si';

/* CONCATENACION */

SELECT CONCAT(rfc, ' - ' ,razonsocial) 
AS 'RFC - RAZON SOCIAL'
FROM proveedores;

/* OPERADORES COMPUESTOS */

/* OPERADORES LOGICOS */

SELECT Clave,RFC,Numero,Fecha,Cantidad
FROM Entregan
WHERE Numero Between 5000 and 5010;

SELECT RFC,Cantidad, Fecha,Numero
FROM Entregan
WHERE Numero Between 5000 and 5010 AND
Exists ( SELECT RFC
FROM Proveedores
WHERE RazonSocial LIKE 'La%' and Entregan.RFC = Proveedores.RFC );

SELECT RFC,Cantidad, Fecha,Numero
FROM Entregan
WHERE Numero Between 5000 and 5010 
AND RFC IN ( SELECT RFC
FROM Proveedores
WHERE RazonSocial LIKE 'La%' and Entregan.RFC = Proveedores.RFC );

SELECT *
FROM proyectos
ORDER by numero DESC
LIMIT 2;

/* MODIFICANDO LA ESTRUCTURA */

ALTER TABLE materiales 
ADD PorcentajeImpuesto NUMERIC(6,2);

select * from materiales;

UPDATE materiales 
SET PorcentajeImpuesto = 2*clave/1000;

SELECT SUM(precio) AS 'Total'
FROM materiales AS m
JOIN entregan AS e
ON m.clave = e.clave;

/* CREACION DE VISTAS */

CREATE VIEW vista1 (clave, descripcion) AS	
SELECT m.clave, descripcion
FROM materiales AS m
JOIN entregan AS e
ON m.clave = e.clave
JOIN proyectos AS  p
ON e.numero = p.numero
WHERE p.denominacion = 'México sin ti no estamos completos';

SELECT * FROM vista1;

CREATE VIEW vista2 (clave, descripcion) AS
SELECT m.clave, descripcion
FROM materiales AS m
JOIN entregan AS e
ON m.clave = e.clave
JOIN proveedores AS p
ON e.rfc = p.rfc
WHERE p.razonsocial = 'Acme tools';

SELECT * FROM vista2;

CREATE VIEW vista3 (rfc, razonsocial) AS
SELECT p.rfc, p.razonsocial
FROM proveedores AS p
JOIN entregan AS e
ON p.rfc = e.rfc
WHERE YEAR(e.fecha) = 2000
AND e.numero >= 300
GROUP BY e.rfc;

SELECT * FROM vista3;

CREATE VIEW vista4 (descripcion, piezasentregadas) AS
SELECT m.descripcion, SUM(e.numero)
FROM materiales AS m
JOIN entregan AS e
ON m.clave = e.clave
WHERE YEAR(e.fecha) = 2000
GROUP BY m.descripcion;

SELECT * FROM vista4;

CREATE VIEW vista5_1 (clave, numero) AS
SELECT clave, numero
FROM entregan
WHERE YEAR(fecha) = 2001;

CREATE VIEW vista5 (clave) AS
SELECT clave
FROM vista5_1
ORDER BY numero DESC
LIMIT 1;

SELECT * FROM vista5;

CREATE VIEW vista6 (clave, descripcion) AS
SELECT clave, descripcion
FROM materiales
WHERE descripcion LIKE '%ub%';

SELECT * FROM vista6;

CREATE VIEW vista7 (denominacion, total) AS
SELECT p.denominacion, SUM(m.precio)
FROM proyectos AS p
JOIN entregan AS e
ON p.numero = e.numero
JOIN materiales AS m
ON e.clave = m.clave
GROUP BY p.denominacion;

SELECT * FROM vista7;

CREATE VIEW vista8_1 (denominacion, rfc, razonsocial) AS
SELECT proy.denominacion, prov.rfc, prov.razonsocial
FROM proveedores AS prov
JOIN entregan AS e
ON prov.rfc = e.rfc
JOIN proyectos AS proy
ON e.numero = proy.numero
WHERE proy.denominacion = 'Educando en Coahuila';

SELECT * FROM vista8_1;

CREATE VIEW vista8 (denominacion, rfc, razonsocial) AS
SELECT proy.denominacion, prov.rfc, prov.razonsocial
FROM proveedores AS prov
JOIN entregan AS e
ON prov.rfc = e.rfc
JOIN proyectos AS proy
ON e.numero = proy.numero
WHERE proy.denominacion = 'Televisa en acción'
AND proy.denominacion NOT IN (SELECT denominacion FROM vista8_1);

SELECT * FROM vista8;

CREATE VIEW vista8_1 (denominacion, rfc, razonsocial) AS
SELECT proy.denominacion, prov.rfc, prov.razonsocial
FROM proveedores AS prov
JOIN entregan AS e
ON prov.rfc = e.rfc
JOIN proyectos AS proy
ON e.numero = proy.numero
WHERE proy.denominacion = 'Educando en Coahuila';

SELECT * FROM vista8_1;

SELECT proy.denominacion, prov.rfc, prov.razonsocial
FROM proveedores AS prov
JOIN entregan AS e
ON prov.rfc = e.rfc
JOIN proyectos AS proy
ON e.numero = proy.numero
WHERE proy.denominacion = 'Televisa en acción'
AND proy.denominacion NOT IN (	SELECT proy.denominacion
								FROM proveedores AS prov
								JOIN entregan AS e
								ON prov.rfc = e.rfc
								JOIN proyectos AS proy
								ON e.numero = proy.numero
								WHERE proy.denominacion = 'Educando en Coahuila');
                                
SELECT m.precio, m.descripcion
FROM proveedores AS prov
JOIN entregan AS e
ON prov.rfc = e.rfc
JOIN proyectos AS proy
ON e.numero = proy.numero
JOIN materiales AS m
ON e.clave = m.clave
WHERE proy.denominacion = 'Televisa en acción'
AND prov.rfc IN (SELECT rfc FROM vista8_1);