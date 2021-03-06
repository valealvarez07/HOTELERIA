const router = require('express').Router();
const Reserva = require('../../models/reservas');

router.get('/', (req, res, next) => {

    Reserva.obtenerTodasReservas()
    .then(reservas => {
        res.json({
            reservas,
        });
    })

    .catch(err => {
        next(err);
    });
});

router.get('/:numeroReserva', (req, res, next) => {

    Reserva.obtenerReservaPorNumero(req.params.numeroReserva)
    .then(reserva => {
        res.json({
            reserva,
        });
    })
    
    .catch(err => {
        next(err);
    });
});

router.post('/', (req, res, next) => {

    const numeroReserva = req.body.numeroReserva;
    const idUsuario = req.body.idUsuario;
    const numeroHabitacion = req.body.numeroHabitacion;
    const fechaLlegada = req.body.fechaLlegada;
    const fechaSalida = req.body.fechaSalida;
    const modoPago = req.body.modoPago;
    const cantidadHuespedes = req.body.cantidadHuespedes;

    const nuevaReserva = new Reserva (numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes);

    nuevaReserva.save()
    .then(() => {
        res.send ('creaste una reserva');
    })

    .catch(err => {
        next(err);
    });
        
});

router.delete('/:numeroReserva', (req, res, next) => {

    Reserva.eliminarReservaPorNumero(req.params.numeroReserva)
    .then(() => {
        res.send ('borraste una reserva');
        
    })

    .catch(err => {
        next(err);
    });
});

module.exports = router;