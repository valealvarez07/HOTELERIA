
const db = require('../services/db-connection');

const GUARDAR_USUARIO = 'INSERT INTO usuarios VALUES(?,?,?,?,?,?,?,?,?,?,?)'; 
const SELECCIONAR_TODOS_USUARIOS = 'SELECT * FROM usuarios';
const SELECCIONAR_USUARIO_numeroDocumento = 'SELECT * FROM usuarios WHERE numeroDocumento = ?';
//const MODIFICAR_HABITACION = 'UPDATE habitaciones SET tipoDocumento = ?, numeroDocumento = ?, nombre = ?, sexo = ?, edad = ?, telefono = ?, direccion = ?, email = ?, administrador = ?, contraseña = ? WHERE id = ?';
const ELIMINAR_USUARIO = 'DELETE FROM usuarios WHERE id = ?';

class Usuario {
    constructor (id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña) {
        this.id = id;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.nombre = nombre;
        this.sexo = sexo;
        this.edad = edad;
        this.telefono = telefono;
        this.direccion = direccion;
        this.email = email;
        this.administrador = administrador;
        this.contraseña = contraseña;
    }

    save() {
        const {id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña} = this;
        return new Promise((resolve, reject) => {
            db.query(GUARDAR_USUARIO, [id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña], (err, res) => {
                if (err) {
                    if (err.errno === 1062) {
                        reject ({
                            error: "Esta id de usuario ya existe"
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

    static obtenerTodosUsuarios () {
        return new Promise ((resolve, reject) => {
            db.query(SELECCIONAR_TODOS_USUARIOS, (err, res) => {
                if (err){
                    reject(err);
                } else if (res.length === 0) {
                    reject(new Error('No hay resultados'));
                } else {
                    resolve(res.map((usuario) => {
                        const {id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña}  = usuario;
                        return new Usuario(id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña);
                    }));
                }
            }); 
        })
    }

    static obtenerUsuarioPorId (id) {
        return new Promise ((resolve, reject) => {
            db.query(SELECCIONAR_USUARIO_numeroDocumento, [id], (err, res) => {
                if (err || res[0] === undefined){
                    reject(err);
                } else if (res.length === 0) {
                    reject(new Error('No hay resultados'));
                } else {
                    const {id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña} = res[0];
                    resolve (new Usuario(id, tipoDocumento, numeroDocumento, nombre, sexo, edad, telefono, direccion, email, administrador, contraseña))
                }
            }); 
        })
    }

    // static modificarHabitacion (numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad) {
    //     return new Promise ((resolve, reject) => {
    //         console.log(numeroHabitacion, valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad);
            
    //         db.query(MODIFICAR_HABITACION, [valoracion, imagenes, descripcion, tipoHabitacion, precio, comodidades, servicios, tamañoMetros2, disponibilidad, numeroHabitacion], (err, resp) => {

    //             if (err) {
    //                 reject(err)
    //             } else {
    //                 resolve()
    //             }

                
    //             //if (err) {
    //             //    if (err.errno === 1062) {
    //             //        resolve ({
    //             //            error: "Esta habitacion ya existe"
    //             //        });
    //             //    } else {
    //             //       reject (err);
    //             //    }
    //             //} else {
    //             //    resolve()
    //             //}
                
    //         }); 
    //     });     
    // }

    static eliminarUsuarioPorId (id) {
        return new Promise ((resolve, reject) => {
            db.query(ELIMINAR_USUARIO, [id], (err, res) => {
                if (err){
                    reject(err);
                } else {
                    resolve ()
                }
            }); 
        })
    }
}

module.exports = Usuario;