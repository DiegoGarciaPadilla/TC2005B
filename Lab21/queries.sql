# La suma de las cantidades e importe total de todas las entregas realizadas durante el 97.}}

select sum(e.cantidad) as "Cantidad", 
sum(e.cantidad * m.precio) + m.impuesto as "Total con impuesto"
from materiales as m
join entregan as e
on m.clave = e.clave
where year(e.fecha) = 1997;

# Para cada proveedor, obtener la razón social del proveedor, número de entregas e importe total de las entregas realizadas.

select p.razonsocial as "Razón social",
count(e.clave) as "Cantidad de entregas", 
sum(e.cantidad * m.precio) + m.impuesto as "Total con impuesto"
from proveedores as p
join entregan as e
on p.rfc = e.rfc
join materiales as m
on e.clave = m.clave
group by p.razonsocial;

# Por cada material obtener la clave y descripción del material, la cantidad total entregada, la mínima cantidad entregada, la máxima cantidad entregada, el importe total de las entregas de aquellos materiales en los que la cantidad promedio entregada sea mayor a 400.

select m.clave as "Clave", 
m.descripcion as "Descripción",
sum(e.cantidad) as "Cantidad total entregada",
min(e.cantidad) as "Mínima cantidad entregada",
max(e.cantidad) as "Máxima cantidad entregada",
sum(e.cantidad * m.precio) + m.impuesto as "Importe total con impuesto"
from materiales as m
join entregan as e
on m.clave = e.clave
group by m.clave
having avg(e.cantidad) > 400;

# Para cada proveedor, indicar su razón social y mostrar la cantidad promedio de cada material entregado, detallando la clave y descripción del material, excluyendo aquellos proveedores para los que la cantidad promedio sea menor a 500.

select p.razonsocial as "Razón social",
avg(e.cantidad) as "Cantidad promedio",
m.clave as "Clave",
m.descripcion as "Descripción"
from proveedores as p
join entregan as e
on p.rfc = e.rfc
join materiales as m
on e.clave = m.clave
group by m.clave
having avg(e.cantidad) < 500;

# Mostrar en una solo consulta los mismos datos que en la consulta anterior pero para dos grupos de proveedores: aquellos para los que la cantidad promedio entregada es menor a 370 y aquellos para los que la cantidad promedio entregada sea mayor a 450.

select p.razonsocial as "Razón social",
avg(e.cantidad) as "Cantidad promedio",
m.clave as "Clave",
m.descripcion as "Descripción"
from proveedores as p
join entregan as e
on p.rfc = e.rfc
join materiales as m
on e.clave = m.clave
group by m.clave
having avg(e.cantidad) < 370
or avg(e.cantidad) > 450;

# Insertar 5 materiales

INSERT INTO `rcortese`.`materiales`
(`clave`,
`descripcion`,
`precio`,
`impuesto`)
VALUES
('2060',
'WD-40',
'200',
'40');

# Clave y descripción de los materiales que nunca han sido entregados.

select clave, descripcion
from materiales
where clave not in (select clave from entregan);

# Razón social de los proveedores que han realizado entregas tanto al proyecto 'Vamos México' como al proyecto 'Querétaro Limpio'.

select distinct p.razonsocial
from proveedores as p
join entregan as e on p.rfc = e.rfc
join proyectos as pro on e.numero = pro.numero
where pro.denominacion = "Vamos México"
and exists (	select distinct p.razonsocial
						from proveedores as p
						join entregan as e on p.rfc = e.rfc
						join proyectos as pro on e.numero = pro.numero
						where pro.denominacion = "Querétaro Limpio");

# Descripción de los materiales que nunca han sido entregados al proyecto 'CIT Yucatán'.

select distinct descripcion
from materiales
where clave not in (select e.clave
					from entregan as e
                    join proyectos as p on e.numero = p.numero
                    where p.denominacion = "CIT Yucatán");

# Razón social y promedio de cantidad entregada de los proveedores cuyo promedio de cantidad entregada es mayor al promedio de la cantidad entregada por el proveedor con el RFC 'VAGO780901'.

SELECT Pr.Razonsocial, AVG(E.Cantidad) AS 'Promedio de cantidad entregada'
FROM Proveedores Pr JOIN Entregan AS E ON E.RFC = Pr.RFC
GROUP BY Pr.Razonsocial
HAVING AVG(E.Cantidad) > (SELECT AVG(E.Cantidad) FROM Entregan E 
							JOIN Proveedores AS Pr ON Pr.RFC = E.RFC
                            WHERE Pr.RFC = 'AAAA800101');

# RFC, razón social de los proveedores que participaron en el proyecto 'Infonavit Durango' y cuyas cantidades totales entregadas en el 2000 fueron mayores a las cantidades totales entregadas en el 2001.

SELECT PR.rfc, PR.razonsocial 
FROM proveedores AS PR
JOIN entregan AS E ON PR.rfc = E.rfc
JOIN proyectos AS P ON E.numero = P.numero
WHERE P.denominacion = 'Infonavit Durango'
GROUP BY PR.rfc, PR.razonsocial
HAVING 
SUM(CASE WHEN E.fecha BETWEEN '2000-01-01' AND '2000-12-31' THEN E.cantidad ELSE 0 END) 	>
       	SUM(CASE WHEN E.fecha BETWEEN '2001-01-01' AND '2001-12-31' THEN E.cantidad ELSE 0 END);