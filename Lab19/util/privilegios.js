exports.consulta_cultivo = (req, res, next) => {

    const { privilegios } = req.session;

    for (let i = 0; i < privilegios.length; i++) {
        if (privilegios[i].Nombre === "consulta_cultivo") {
            next();
            return;
        }
    }

    res.status(403).send("No tienes permisos para consultar cultivos");
}

exports.crea_cultivo = (req, res, next) => {

    const { privilegios } = req.session;

    for (let i = 0; i < privilegios.length; i++) {
        if (privilegios[i].Nombre === "crear_cultivo") {
            next();
            return;
        }
    }

    res.status(403).send("No tienes permisos para crear cultivos");
}