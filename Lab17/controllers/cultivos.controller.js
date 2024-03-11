const Cultivo = require("../models/cultivo.model");

exports.get_crear = (request, response, next) => {
  response.render("crear", {
    username: request.session.username || "",
  });
};

exports.post_crear = (request, response, next) => {
  console.log(request.body);
  const mi_cultivo = new Cultivo(
    request.body.nombre,
    request.body.descripcion,
    request.body.cantidad,
    request.body.precio,
    request.body.imagen
  );
  mi_cultivo.save();
  response.setHeader("Set-Cookie", `ultimo_cultivo=${mi_cultivo.nombre}`);
  response.redirect("/");
};

exports.get_root = (request, response, next) => {
  console.log(request.cookies);
  console.log(request.cookies.ultimo_cultivo);
  response.render("cultivos", {
    cultivos: Cultivo.fetchAll(),
    ultimo_cultivo: request.cookies.ultimo_cultivo || "",
    username: request.session.username || "",
  });
};
