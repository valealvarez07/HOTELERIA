const React = require('react');

class ModificarHabitacion extends React.Component {

    constructor(props) {
        super(props);

        this.guardarNumeroHabitacion = this.guardarNumeroHabitacion.bind(this);
        this.guardarValoracion = this.guardarValoracion.bind(this);
        this.guardarImagenes = this.guardarImagenes.bind(this);
        this.guardarDescripcion = this.guardarDescripcion.bind(this);
        this.guardarTipoHabitacion = this.guardarTipoHabitacion.bind(this);
        this.guardarPrecio = this.guardarPrecio.bind(this);
        this.guardarComodidades = this.guardarComodidades.bind(this);
        this.guardarServicios = this.guardarServicios.bind(this);
        this.guardarTamañoMetros2 = this.guardarTamañoMetros2.bind(this);
        this.guardarDisponibilidad = this.guardarDisponibilidad.bind(this);

        this.modificarHabitacion = this.modificarHabitacion.bind(this);
        this.eliminarHabitacion = this.eliminarHabitacion.bind(this);

        this.state = {
            habitacion: {},
            loading: false,
            error: null,
            redireccionar: false,
        }
    }
    
    componentDidMount() {
        fetch(`/api/habitaciones/${this.props.numeroHabitacion}`)
        .then(res => res.json())
        .then((data) => {
            this.setState({
                habitacion: data.habitacion,
                error: false,
            });
        })

        .catch ((err) => {
            console.log(err);
            this.setState({
                error: true,
            });
        });
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
                window.location.href = "/hoteleria"
            )
        }

        return (

            <React.Fragment>

                {/* <h3>numeroHabitacion: {this.props.numeroHabitacion}, tipoHabitacion: {this.props.tipoHabitacion}</h3>
                <p>valoracion: {this.props.valoracion}</p> */}

                    <div>
                        <form>
                        
                            <label>numeroHabitacion </label>
                            <input onChange={this.guardarNumeroHabitacion} placeholder={this.state.habitacion.numeroHabitacion} type="text"></input>
                            <br/>
                            <label>valoracion </label>
                            <select onChange={this.guardarValoracion} ref="valoracionRef" value={this.state.habitacion.valoracion}>
                                <option value="1 Estrella">1 Estrella</option>
                                <option value="2 Estrellas">2 Estrellas</option>
                                <option value="3 Estrellas">3 Estrellas</option>
                                <option value="4 Estrellas">4 Estrellas</option>
                                <option value="5 Estrellas">5 Estrellas</option>
                            </select>
                            <br/>
                            <label>imagenes </label>
                            <input onChange={this.guardarImagenes} placeholder={this.state.habitacion.imagenes} type="text"></input>
                            <br/>
                            <label>descripcion </label>
                            <input onChange={this.guardarDescripcion} placeholder={this.state.habitacion.descripcion} type="text"></input>
                            <br/>
                            <label>tipoHabitacion </label>
                            <select onChange={this.guardarTipoHabitacion} ref="tipoHabitacionRef" value={this.state.habitacion.tipoHabitacion}>
                                <option value="1 Persona">1 Persona</option>
                                <option value="2 Personas">2 Personas</option>
                                <option value="4 Personas">4 Personas</option>
                                <option value="Matrimonial">Matrimonial</option>
                            </select>
                            <br/>
                            <label>precio </label>
                            <input onChange={this.guardarPrecio} placeholder={this.state.habitacion.precio} type="text"></input>
                            <br/>
                            <label>comodidades </label>
                            <input onChange={this.guardarComodidades} placeholder={this.state.habitacion.comodidades} type="text"></input>
                            <br/>
                            <label>servicios </label>
                            <input onChange={this.guardarServicios} placeholder={this.state.habitacion.servicios} type="text"></input>
                            <br/>
                            <label>tamañoMetros2 </label>
                            <input onChange={this.guardarTamañoMetros2} placeholder={this.state.habitacion.tamañoMetros2} type="text"></input>
                            <br/>
                            <label>disponibilidad </label>
                            <input onChange={this.guardarDisponibilidad} placeholder={this.state.habitacion.disponibilidad} type="date"></input>
                            <br/><br/>

                            <button type="button" onClick={this.modificarHabitacion}>modificar habitacion</button>
                        </form>
                    
                        <br/>

                        <button onClick={this.eliminarHabitacion}>eliminar habitacion</button>

                    </div>
                
            </React.Fragment>
        );
    }

    modificarHabitacion (){
        fetch (`/api/habitaciones/${this.props.numeroHabitacion}`, {
            headers: {"Content-Type": "application/json; charset=utf-8"},
            method: 'PUT',
            body: JSON.stringify({
                numeroHabitacion: this.numeroHabitacion,
                valoracion: this.refs.valoracionRef.value,
                imagenes: this.imagenes,
                descripcion: this.descripcion,
                tipoHabitacion: this.refs.tipoHabitacionRef.value,
                precio: this.precio,
                comodidades: this.comodidades,
                servicios: this.servicios,
                tamañoMetros2: this.tamañoMetros2,
                disponibilidad: this.disponibilidad,
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
        });
        
    }

    guardarNumeroHabitacion (event) {
        this.numeroHabitacion = event.target.value;
    }
    guardarValoracion (event) {
        this.valoracion = event.target.value;
    }
    guardarImagenes (event) {
        this.imagenes = event.target.value;
    }
    guardarDescripcion (event) {
        this.descripcion = event.target.value;
    }
    guardarTipoHabitacion (event) {
        this.tipoHabitacion = event.target.value;
    }
    guardarPrecio (event) {
        this.precio = event.target.value;
    }
    guardarComodidades (event) {
        this.comodidades = event.target.value;
    }
    guardarServicios (event) {
        this.servicios = event.target.value;
    }
    guardarTamañoMetros2 (event) {
        this.tamañoMetros2 = event.target.value;
    }
    guardarDisponibilidad (event) {
        this.disponibilidad = event.target.value;
    }

    eliminarHabitacion (){
        fetch (`/api/habitaciones/${this.props.numeroHabitacion}`, {
            headers: {"Content-Type": "application/json; charset=utf-8"},
            method: 'DELETE',
        })
    
        .then ((data) => {
            this.setState ({ 
                redireccionar: true,
            }); 
          
      })
    
      .catch(() => {
          this.setState ({ 
              error: true,
          });
      });
      
    }
};

module.exports = ModificarHabitacion;
