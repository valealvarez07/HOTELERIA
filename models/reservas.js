
const db = require('../services/db-connection');

const GUARDAR_RESERVA = 'INSERT INTO reservas VALUES (0,?,?,?,?,?,?)'; 
const SELECCIONAR_TODAS_RESERVAS = 'SELECT * FROM reservas';
const ELIMINAR_RESERVA = 'DELETE FROM reservas WHERE numeroReserva = ?';
//const SELECCIONAR_FECHA = 'SELECT * FROM reservas WHERE numeroHabitacion = ? AND fechaLlegada <= fechaLlegadaNueva AND fechaSalida >= fechaLlegadaNueva OR fechaLlegada <= fechaSalidaNueva AND fechaSalida >= fechaSalidaNueva';
  const SELECCIONAR_FECHA = 'SELECT * FROM reservas WHERE numeroHabitacion = ? AND fechaLlegada <=         ?         AND fechaSalida >=         ?         OR fechaLlegada <=        ?         AND fechaSalida >=        ?';


class Reserva {
    constructor (numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes) {
        this.numeroReserva = numeroReserva;
        this.idUsuario = idUsuario;
        this.numeroHabitacion = numeroHabitacion;
        this.fechaLlegada = fechaLlegada;
        this.fechaSalida = fechaSalida;
        this.modoPago = modoPago;
        this.cantidadHuespedes = cantidadHuespedes;
    }

    save() {
        const {idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes} = this;

        return new Promise ((resolve, reject) => {

            db.query(SELECCIONAR_FECHA, [numeroHabitacion, fechaLlegada, fechaLlegada, fechaSalida, fechaSalida], (err, res) => {
                if (err) {
                    reject (err);
                } else if (res.length !== 0) {
                    reject ('ya hay una reserva de esta habitacion dentro de estas fechas');

                } else if (res.length === 0) {
                    db.query(GUARDAR_RESERVA, [idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes], (err, res) => {
                        if (err) {
                            if (err.errno === 1062) {
                               reject ({
                                  error: "Este numero de reserva ya existe"
                               });
                            } else {
                                reject (err);
                            }
                        } 
                    });
                }
            });

            
        }); 
    }

    static obtenerTodasReservas () {
        return new Promise ((resolve, reject) => {
            db.query(SELECCIONAR_TODAS_RESERVAS, [], (err, res) => {
                if (err){
                    reject(err);
                } else if (res.length === 0) {
                   reject(new Error('No hay resultados'));
                } else {
                    resolve(res.map((reserva) => {
                        const {numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes}  = reserva;
                        return new Reserva(numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes);
                    }));
                }
            }); 
        })
    }

    static obtenerReservaPorNumero (numeroReserva) {
        return new Promise ((resolve, reject) => {
            db.query(SELECCIONAR_RESERVA, [numeroReserva], (err, res) => {
                if (err || res[0] === undefined){
                    reject(err);
                } else if (res.length === 0) {
                    reject(new Error('No hay resultados'));
                } else {
                    const {numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes} = res[0];
                    resolve (new Reserva(numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes))
                }
            }); 
        })
    }

    static eliminarReservaPorNumero (numeroReserva) {
        return new Promise ((resolve, reject) => {
            db.query(ELIMINAR_RESERVA, [numeroReserva], (err, res) => {
                if (err){
                    reject(err);
                } else {
                    resolve ()
                }
            }); 
        })
    }
}

module.exports = Reserva;