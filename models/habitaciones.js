
const db = require('../services/db-connection');

const GUARDAR_HABITACION = 'INSERT INTO habitaciones VALUES(?,?,?,?,?,?,?,?,?,?)'; 
const SELECCIONAR_TODAS_HABITACIONES = 'SELECT * FROM habitaciones';
const SELECCIONAR_HABITACION_NUMERO = 'SELECT * FROM habitaciones WHERE numeroHabitacion = ?';
const MODIFICAR_HABITACION = 'UPDATE habitaciones SET valoracion = ?, imagenes = ?, descripcion = ?, tipoHabitacion = ?, precio = ?, comodidades = ?, servicios = ?, tamañoMetros2 = ?, disponibilidad = ? WHERE numeroHabitacion = ?';
const ELIMINAR_HABITACIONES = 'DELETE FROM habitaciones WHERE numeroHabitacion = ?';

class Habitacion {
    constructor (numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad) {
        this.numeroHabitacion = numeroHabitacion;
        this.valoracion = valoracion;
        this.imagenes = imagenes;
        this.descripcion = descripcion;
        this.tipoHabitacion = tipoHabitacion;
        this.precio = precio;
        this.comodidades = comodidades;
        this.servicios = servicios;
        this.tamañoMetros2 = tamañoMetros2;
        this.disponibilidad = disponibilidad;
    }

    save() {
        const {numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad} = this;
        return new Promise((resolve, reject) => {
            db.query(GUARDAR_HABITACION, [numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad], (err, res) => {
                if (err) {
                    if (err.errno === 1062) {
                        reject ({
                           error: "Este numero de habitacion ya existe"
                        });
                    } else {
                        reject (err);
                    }
                } else{
                    resolve()
                }
            }); 
        }); 
    }

    static obtenerTodasHabitaciones () {
        return new Promise ((resolve, reject) => {
            db.query(SELECCIONAR_TODAS_HABITACIONES, (err, res) => {
                if (err){
                    reject(err);
                } else if (res.length === 0) {
                    reject(new Error('No hay resultados'));
                } else {
                    // para q devuelva un array con los modelos 
                    //const nuevoArray = results.map((result) => {
                     //   const {numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad} = result;
                     //   return (new Habitacion (numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad))
                    //})
                    
                    //resolve (nuevoArray)
                    try {
                        resolve(res.map((habitacion) => {
                            const {numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad}  = habitacion;
                            return new Habitacion(numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad);
                        }));
                    } catch(err) {
                        reject(err);
                    }
                }
            }); 
        })
    }

    static obtenerHabitacionPorNumero(numeroHabitacion) {
        return new Promise((resolve, reject) => {
            //console.log(numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad);
            db.query(SELECCIONAR_HABITACION_NUMERO, [numeroHabitacion], (err, res) => {
                //if (err || res[0] === undefined){
                if (err) {
                    reject(err);
                } else if (res.length === 0) {
                    reject(new Error('No hay resultados'));
                } else {
                    const {numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad} = res[0];
                    resolve (new Habitacion(numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad));
                }
            }); 
        })
    }  

    static modificarHabitacion(numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad) {
        return new Promise ((resolve, reject) => {
            //console.log(numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad);
            
            db.query(MODIFICAR_HABITACION, [valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad, numeroHabitacion], (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }

                
                //if (err) {
                //    if (err.errno === 1062) {
                //        resolve ({
                //            error: "Esta habitacion ya existe"
                //        });
                //    } else {
                //       reject (err);
                //    }
                //} else {
                //    resolve()
                //}
                
            }); 
        });     
    }
    
    static eliminarHabitacionPorNumero (numeroHabitacion) {
        return new Promise ((resolve, reject) => {
            db.query(ELIMINAR_HABITACIONES, [numeroHabitacion], (err, res) => {
                if (err){
                    reject(err);
                } else {
                    resolve()
                }
            }); 
        })
    }
}

module.exports = Habitacion;