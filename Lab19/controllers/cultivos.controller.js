const Cultivo = require("../models/cultivo.model");

exports.get_crear = (request, response, next) => {
  response.render("crear", {
    username: request.session.username || "",
    csrfToken: request.csrfToken(),
  });
};

exports.post_crear = (request, response, next) => {
  console.log(request.body);
  const mi_cultivo = new Cultivo(
    request.body.nombre,
    request.body.descripcion,
    request.body.precio,
    request.body.imagen
  );
  mi_cultivo
    .save()
    .then(([rows, fieldData]) => {
      response.setHeader(
        "Set-Cookie",
        "ultimo_cultivo=" + mi_cultivo.nombre + "; HttpOnly"
      );
      response.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.get_root = (request, response, next) => {
  console.log(request.cookies);
  console.log(request.cookies.ultimo_cultivo);

  Cultivo.fetch(request.params.id, request.params.username)
    .then(([rows, fieldData]) => {
      response.render("cultivos", {
        cultivos: rows,
        ultimo_cultivo: request.cookies.ultimo_cultivo || "",
        username: request.session.username || "",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
