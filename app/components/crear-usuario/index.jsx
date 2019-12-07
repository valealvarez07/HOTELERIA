const React = require('react');
const { Redirect } = require('react-router-dom');

class CrearUsuario extends React.Component {

    constructor(props) {
        super(props);

        this.guardarId = this.guardarId.bind(this);
        this.guardarTipoDocumento = this.guardarTipoDocumento.bind(this);
        this.guardarNumeroDocumento = this.guardarNumeroDocumento.bind(this);
        this.guardarNombre = this.guardarDescriguardarNombrepcion.bind(this);
        this.guardarSexo = this.guardarSexo.bind(this);
        this.guardarEdad = this.guardarEdad.bind(this);
        this.guardarTelefono = this.guardarTelefono.bind(this);
        this.guardarDireccion = this.guardarDireccion.bind(this);
        this.guardarEmail = this.guardarEmail.bind(this);
        this.guardarAdministrador = this.guardarAdministrador.bind(this);
        this.guardarContraseña = this.guardarContraseña.bind(this);

        this.crearUsuario = this.crearUsuario.bind(this);

        this.state = {
            usuario: {},
            loading: false,
            error: null,
            redireccionar: false,
        }
    }
    
    render() {

        if (this.state.loading) {
            return (
                <div>Cargando...</div>
            )
        }

        if (this.state.error) {
            return (
                <div>Error</div>
            )
        }

        if (this.state.redireccionar) {
            return (
                <Redirect to="/hoteleria"/> 
            )
        }

        /*
        renderError(){
            if (this.state.error) {
                return (
                    <div>Error</div>
                )
            }
        }
        */      

        return (

            //{this.satate.error ? <div className="error">error</div> : null;}

            //{ renderError();}

            <React.Fragment>
                <form>
                    <label>id</label>
                    <input onChange={this.guardarId} name="" type="text"></input>
                    <br/>
                    <label>tipoDocumento</label>
                    <input onChange={this.guardarTipoDocumento} type="text"></input>
                    <br/>
                    <label>numeroDocumento</label>
                    <input onChange={this.guardarNumeroDocumento} type="text"></input>
                    <br/>
                    <label>nombre</label>
                    <input onChange={this.guardarNombre} type="text"></input>
                    <br/>
                    <label>sexo</label>
                    <select onChange={this.guardarSexo} ref="sexoRef">
                        <option value="Hombre">Hombre</option>
                        <option value="Mujer">Mujer</option>
                    </select>
                    <br/>
                    <label>edad</label>
                    <input onChange={this.guardarEdad} type="text"></input>
                    <br/>
                    <label>telefono</label>
                    <input onChange={this.guardarTelefono} type="text"></input>
                    <br/>
                    <label>direccion</label>
                    <input onChange={this.guardarDireccion} type="text"></input>
                    <br/>
                    <label>email</label>
                    <input onChange={this.guardarEmail} type="text"></input>
                    <br/>
                    <label>administrador</label>
                    <input onChange={this.guardarAdministrador} ref="administradorRef" type="checkbox" name="administrador" value="1">Si</input>
                    <input onChange={this.guardarAdministrador} ref="administradorRef" type="checkbox" name="administrador" value="0">No</input>
                    <br/>
                    <label>contraseña</label>
                    <input onChange={this.guardarContraseña} type="text"></input>

                    <button type="button" onClick={this.crearUsuario}>crear usuario</button>
                </form>
            </React.Fragment>
        );
    }

    crearUsuario (e){
        e.preventDefault();
        fetch ('/api/usuarios', {
            headers: {"Content-Type": "application/json; charset=utf-8"},
            method: 'POST',
            body: JSON.stringify({
                id: this.id,
                tipoDocumento: this.tipoDocumento,
                numeroDocumento: this.numeroDocumento,
                nombre: this.nombre,
                sexo: this.refs.tipoHabitacionRef.value,
                edad: this.edad,
                telefono: this.telefono,
                direccion: this.direccion,
                email: this.email,
                administrador: this.administrador,
                contraseña: this.contraseña,
            })
        })

        .then ((data) => {
            this.setState ({ 
                redireccionar: true,
            });            
        })

        .catch(err => {
            this.setState ({ 
                error: err.error,
            });
            console.log(err);
        });
        
    }

    guardarId (event) {
        this.id = event.target.value;
    }
    guardarTipoDocumento (event) {
        this.tipoDocumento = event.target.value;
    }
    guardarNumeroDocumento (event) {
        this.numeroDocumento = event.target.value;
    }
    guardarNombre (event) {
        this.nombre = event.target.value;
    }
    guardarSexo (event) {
        this.sexo = event.target.value;
    }
    guardarEdad (event) {
        this.edad = event.target.value;
    }
    guardarTelefono (event) {
        this.telefono = event.target.value;
    }
    guardarDireccion (event) {
        this.direccion = event.target.value;
    }
    guardarEmail (event) {
        this.email = event.target.value;
    }
    guardarAdministrador (event) {
        this.administrador = event.target.value;
    }
    guardarContraseña (event) {
        this.contraseña = event.target.value;
    }
};

module.exports = CrearUsuario;
