const router = require('express').Router();
const Usuario = require('../../models/usuarios');

//Handlers para los endpoints de la API de usuarios

router.get('/', (req, res, next) => {

    Usuario.obtenerTodosUsuarios()
    .then(usuarios => {
        res.json({
            usuarios,
        });
    })
    
    .catch(err => {
        next(err);
    });
});

router.get('/:id', (req, res, next) => {

    Usuario.obtenerUsuarioPorId(req.params.id)
    .then(usuario => {
        res.json({
            usuario,
        });
    })
    
    .catch(err => {
        next(err);
    });
});


router.post('/', (req, res, next) => {

    const id = req.body.id;
    const tipoDocumento = req.body.tipoDocumento;
    const numeroDocumento = req.body.numeroDocumento;
    const nombre = req.body.nombre;
    const sexo = req.body.sexo;
    const edad = req.body.edad;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    const email = req.body.email;
    const administrador = req.body.administrador;
    const contraseña = req.body.contraseña;

    const nuevoUsuario = new Usuario (id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña);

    nuevoUsuario.save()
    .then(() => {
        res.send ('creaste un usuario');
    })

    .catch(err => {
        next(err);
    });
        
});

router.put('/:id', (req, res, next) => {

    const id = req.body.id;
    const tipoDocumento = req.body.tipoDocumento;
    const numeroDocumento = req.body.numeroDocumento;
    const nombre = req.body.nombre;
    const sexo = req.body.sexo;
    const edad = req.body.edad;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    const email = req.body.email;
    const administrador = req.body.administrador;
    const contraseña = req.body.contraseña;

    Usuario.modificarUsuario(id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña)
    .then(usuario => {
        res.json({
            usuario,
        });
    })

    .catch(err => {
        next(err);
    });
        
});


router.delete('/:id', (req, res, next) => {

    Usuario.eliminarUsuarioPorId(req.params.id)
    .then(() => {
        res.send ('borraste una usuario');
    })

    .catch(err => {
        next(err);
    });
});

module.exports = router;