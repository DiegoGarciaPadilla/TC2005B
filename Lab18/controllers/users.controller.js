const User = require('../models/user.model');   
const bcrypt = require('bcryptjs');

exports.get_login = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        username: request.session.username || '',
        registro: false,
        csrfToken: request.csrfToken(),
        error: error
    });
};

exports.post_login = (request, response, next) => {
    User.fetchOne(request.body.username)
        .then(([users, fieldData]) => {
            if (users.length == 1) {
                const user = users[0];
                bcrypt.compare(request.body.password, user.password)
                    .then((doMatch) => {
                        if(doMatch) {
                            request.session.username = user.username;
                            request.session.isLoggedIn = true;
                            response.redirect('/');
                        } else {
                            request.session.error = "Usuario y/o contraseña incorrectos";
                            response.redirect('/users/login');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                request.session.error = "Usuario y/o contraseña incorrectos";
                response.redirect('/users/login');
            }
        })
        .catch((error) => {console.log(error);});
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/users/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};

exports.get_signup = (request, response, next) => {
    response.render('login', {
        username: request.session.username || '',
        registro: true,
        csrfToken: request.csrfToken(),
        error: ''
    });
};

exports.post_signup = (request, response, next) => {
    const new_user = new User(
        request.body.username, request.body.name, request.body.password
    );
    new_user.save()
        .then(() => {
            response.redirect('/users/login');
        })
        .catch((error) => {
            console.log(error);
        });
};