const db = require("../util/database");

module.exports = class Cultivo {
  // Constructor de la clase.

  constructor(mi_nombre, mi_descripcion, mi_cantidad, mi_precio, mi_imagen) {
    this.nombre = mi_nombre;
    this.descripcion = mi_descripcion;
    this.cantidad = mi_cantidad;
    this.precio = mi_precio;
    this.imagen = mi_imagen;
  }

  // Este método servirá para guardar de manera persistente el nuevo objeto.
  save() {
    return db.execute(
      "INSERT INTO cultivo (nombre, descripcion, cantidad, precio, imagen)  VALUES (?, ?, ?, ?, ?)",
      [this.nombre, this.descripcion, this.cantidad, this.precio, this.imagen]
    );
  }

  // Este método servirá para devolver los objetos del almacenamiento persistente.
  static fetchAll() {
    return db.execute("SELECT * FROM cultivo");
  }

  // Este método servirá para devolver un solo objeto del almacenamiento persistente.DF
  static fetchOne(id) {
    return db.execute("SELECT * FROM cultivo WHERE idcultivo = ?", [id]);
  }

  // Este método servirá para devolver un solo objeto o todos los objetos del almacenamiento persistente.
  static fetch(id) {
    if (id) {
      return this.fetchOne(id);
    } else {
      return this.fetchAll();
    }
  }
};
