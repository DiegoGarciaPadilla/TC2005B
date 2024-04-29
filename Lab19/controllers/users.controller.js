const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.get_login = (req, res, next) => {
    const error = req.session.error || "";
    req.session.error = "";
    res.render("login", {
        username: req.session.username || "",
        registro: false,
        csrfToken: req.csrfToken(),
        error: error,
    });
};

exports.post_login = (req, res, next) => {
    User.fetchOne(req.body.username)
        .then(([users]) => {
            if (users.length == 1) {
                const user = users[0];
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((doMatch) => {
                        if (doMatch) {
                            req.session.username = user.username;
                            req.session.isLoggedIn = true;
                            res.redirect("/");
                        } else {
                            req.session.error =
                                "Usuario y/o contraseña incorrectos";
                            res.redirect("login");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                req.session.error = "Usuario y/o contraseña incorrectos";
                res.redirect("login");
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

exports.get_logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/login"); //Este código se ejecuta cuando la sesión se elimina.
    });
};

exports.get_signup = (req, res, next) => {
    res.render("login", {
        username: req.session.username || "",
        registro: true,
        csrfToken: req.csrfToken(),
        error: "",
    });
};

exports.post_signup = (req, res, next) => {
    // Obtener el usuario y contraseña
    const { username, password } = req.body;

    console.log("Usuario: " + username);
    console.log("Contraseña: " + password);

    // Guardar en la base de datos (la password se cifra en el modelo)
    const user = new User(username, password);

    user.save()
        .then(() => {
            res.redirect("login", {
                registro: true,
                csrfToken: req.csrfToken(),
            });
        })
        .catch((error) => {
            console.log(error);
        });
};
