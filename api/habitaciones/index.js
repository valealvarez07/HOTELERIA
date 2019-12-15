const router = require('express').Router(); 
const multer = require('multer');
const upload = multer({ dest: 'imagenes/'});

const Habitacion = require('../../models/habitaciones');

//Handlers para los endpoints de la API de habitaciones

router.get('/', (req, res, next) => {

    Habitacion.obtenerTodasHabitaciones()
    .then(habitaciones => {
        res.json({
            habitaciones,
        });
    })
    
    .catch(err => {
        next(err);
    });
});

router.get('/:numeroHabitacion', (req, res, next) => {

    Habitacion.obtenerHabitacionPorNumero(req.params.numeroHabitacion)
    .then(habitacion => {
        res.json({
            habitacion,
        });
    })
    
    .catch(err => {
        next(err);
    });
});

router.get('/:tipoHabitacion', (req, res, next) => {

    Habitacion.obtenerHabitacionPorTipo(req.params.tipoHabitacion)
    .then(habitacion => {
        res.json({
            habitacion,
        });
    })
    
    .catch(err => {
        next(err);
    });
});

router.post('/', upload.single('fotoHabitacion'), (req, res, next) => {

    const numeroHabitacion = req.body.numeroHabitacion;
    const valoracion = req.body.valoracion;
    //const imagenes = req.body.imagenes;
    const imagenes = req.file.imagenes;
    const descripcion = req.body.descripcion;
    const tipoHabitacion = req.body.tipoHabitacion;
    const precio = req.body.precio;
    const comodidades = req.body.comodidades;
    const servicios = req.body.servicios;
    const tamañoMetros2 = req.body.tamañoMetros2;
    const disponibilidad = req.body.disponibilidad;

    const nuevaHabitacion = new Habitacion (numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad);

    nuevaHabitacion.save()
    .then(() => {
        res.send ('creaste una habitacion');
    })

    .catch(err => {
        next(err);
    });
        
});

router.put('/:numeroHabitacion', (req, res, next) => {

    const numeroHabitacion = req.body.numeroHabitacion;
    const valoracion = req.body.valoracion;
    const imagenes = req.body.imagenes;
    const descripcion = req.body.descripcion;
    const tipoHabitacion = req.body.tipoHabitacion;
    const precio = req.body.precio;
    const comodidades = req.body.comodidades;
    const servicios = req.body.servicios;
    const tamañoMetros2 = req.body.tamañoMetros2;
    const disponibilidad = req.body.disponibilidad;

    Habitacion.modificarHabitacion(numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad)
    .then(habitacion => {
        res.json({
            habitacion,
        });
    })

    .catch(err => {
        next(err);
    });
        
});

router.delete('/:numeroHabitacion', (req, res, next) => {

    Habitacion.eliminarHabitacionPorNumero(req.params.numeroHabitacion)
    .then(() => {
        res.send ('borraste una habitacion');
    })

    .catch(err => {
        next(err);
    });
});

module.exports = router;