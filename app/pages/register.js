const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../services/db-connection');

const saltRounds = 10;

router.post('/', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
            console.log(err);
            res.render('error', {
                error: 'ocurrio un error al insertar un usuario en la base de datos'
            });
        } else {
            db.query('INSERT INTO usuarios VALUES (?,?,?,?,?,?,?,?,?,?)', [req.body.tipoDocumento, req.body.usuario, req.body.nombre, req.body.sexo, req.body.edad, req.body.telefono, req.body.direccion, req.body.email, req.body.administrador, hash], (err, req, res, next) => {
                if (err) {
                    console.log(err);
                    res.render('error', {
                        error: 'ocurrio un error al insertar un usuario en la base de datos'
                    });
                } else { res.render('te hiciste usuario') }
            });
        }
    });
});

module.exports = router;