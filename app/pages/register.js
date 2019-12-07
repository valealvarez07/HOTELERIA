const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt');
const db = require('../../services/db-connection');

const saltRounds = 10;

let conexion = null;

// function initRouter(connection) {
//     conexion = connection;
//     return router
// }

// router.get('/', (req, res) => {
//     res.render('register');
// });

router.post('/', (req, res, err, next) => {
    
    if (err) {
        //console.log(err);
        // res.render('error', {
        //     error: 'ocurrio un error al insertar un usuario en la base de datos'
        // });
        next(err);
    } else {
        //conexion.query('INSERT INTO usuarios VALUES (?, ?)', [req.body.usuario, hash], (err, resp) => {
        //db.query('INSERT INTO usuarios VALUES (contraseña)', [req.body.password], (err, resp) => {
        db.query('INSERT INTO usuarios VALUES (0,?,?,?,?,?,?,?,?,?,?)', [req.body.tipoDocumento, req.body.usuario, req.body.nombre, req.body.sexo, req.body.edad, req.body.telefono, req.body.direccion, req.body.email, req.body.administrador, req.body.password], (err, req, res, next) => {
            if (err) {
                //console.log(err);
                // res.render('error', {
                //     error: 'ocurrio un error al insertar un usuario en la base de datos'
                // });
                next(err);
            } else { res.render('usuarioCreado') }
        });
    }

});


// router.post('/', (req, res) => {
//     bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
//         if (err) {
//             //console.log(err);
//             res.render('error', {
//                 error: 'ocurrio un error al insertar un usuario en la base de datos'
//             });
//         } else {
//             //conexion.query('INSERT INTO usuarios VALUES (?, ?)', [req.body.usuario, hash], (err, resp) => {
//             conexion.query('INSERT INTO usuarios VALUES (contraseña)', [hash], (err, resp) => {
//                 if (err) {
//                     //console.log(err);
//                     res.render('error', {
//                         error: 'ocurrio un error al insertar un usuario en la base de datos'
//                     });
//                 } else { res.render('te hiciste usuario') }
//             });
//         }
//     });
// });


//module.exports = initRouter;
module.exports = router;