const db = require("../util/database");
const bcrypt = require('bcryptjs');

module.exports = class User {

    // Constructor
    constructor(mi_username, mi_email, mi_password) {
        this.username = mi_username;
        this.password = mi_password;
    }

    // Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        return bcrypt.hash(this.password, 12)
            .then((password_cifrado) => {
                return db.execute(
                    "INSERT INTO user (username, password) VALUES (?, ?)",
                    [this.username, password_cifrado]
                );
            })
            .catch(err => {
                console.log(err);
            });
    }

    // Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchOne(username) {
        return db.execute("SELECT * FROM user WHERE username = ?", [username]);
    }

    // Este método servirá para devolver los privilegios de un usuario.
    static fetchPriv(username) {
        return db.execute("SELECT * FROM privilegio AS p JOIN user_privilegio AS up ON p.idprivilegio = up.idprivilegio WHERE up.username = ?", [username]);
    }

}