const Cultivo = require("../models/cultivo.model");

exports.get_crear = (request, response, next) => {
  response.render("crear");
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
  response.redirect("/");
};

exports.get_root = (request, response, next) => {
  response.render("cultivos", {
    cultivos: Cultivo.fetchAll(),
  });
};
