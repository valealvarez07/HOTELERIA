
const db = require('../services/db-connection');

const GUARDAR_RESERVA = 'INSERT INTO reservas VALUES(0,?,?,?,?,?,?)'; 
const SELECCIONAR_TODAS_RESERVAS = 'SELECT * FROM reservas';
//const SELECCIONAR_RESERVA = 'SELECT * FROM reservas WHERE numeroReserva = ?';
const ELIMINAR_RESERVA = 'DELETE FROM reservas WHERE numeroReserva = ?';

// const GUARDAR_RESERVAs = 'select * from reservas where "fechaLlegada" between to_date('01/01/2019','dd/mm/yyyy') and to_date('06/02/2019','dd/mm/yyyy')';
const GUARDAR_RESERVAs = 'SELECT * FROM reservas WHERE fechaLlegada, fechaSalida BETWEEN to_date(?,"yyyy/mm/dd") AND to_date(?,"yyyy/mm/dd")';



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
        const {numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes} = this;
        return new Promise ((resolve, reject) => {
            db.query(GUARDAR_RESERVA, [idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes], (err, res) => {
                if (err) {
                    // if (err.errno === 1062) {
                    //    reject ({
                    //       error: "Este numero de reserva ya existe"
                    //    });
                    if (res.fechaLlegada){

                    } else {
                        reject (err);
                    }
                } else{
                    resolve()
                }
            }); 
        }); 
    }

    static obtenerTodasReservas () {
        return new Promise ((resolve, reject) => {
            db.query(SELECCIONAR_TODAS_RESERVAS, [], (err, res) => {
            //db.query(SELECCIONAR_TODAS_RESERVAS, (err, res) => {
                if (err){
                    reject(err);
                //} else if (res.length === 0) {
                //    reject(new Error('No hay resultados'));
                } else {
                    // const nuevoArray = results.map((result) => {
                    //     const {numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes} = result;
                    //     return (new Reserva (numeroReserva, idUsuario, numeroHabitacion, fechaLlegada, fechaSalida, modoPago, cantidadHuespedes))
                    // })
                    //resolve (nuevoArray)

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
                // } else if (res.length === 0) {
                //     reject(new Error('No hay resultados'));
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