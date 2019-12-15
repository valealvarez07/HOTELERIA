const React = require('react');
const { Redirect } = require('react-router-dom');

class CrearHabitacion extends React.Component {

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

        this.crearHabitacion = this.crearHabitacion.bind(this);

        this.state = {
            habitacion: {},
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
                window.location.href = "/hoteleria"
                //<Redirect to="/hoteleria"/> 
            )
        }
        

        return (

            <React.Fragment>
                <form method="POST" action="/api/habitaciones" encType="multipart/form-data">
                    <label>numeroHabitacion</label>
                    <input onChange={this.guardarNumeroHabitacion} name="" type="text"></input>
                    <br/>
                    <label>valoracion</label>
                    <select onChange={this.guardarValoracion} ref="valoracionRef">
                        <option value="1 Estrella">1 Estrella</option>
                        <option value="2 Estrellas">2 Estrellas</option>
                        <option value="3 Estrellas">3 Estrellas</option>
                        <option value="4 Estrellas">4 Estrellas</option>
                        <option value="5 Estrellas">5 Estrellas</option>
                    </select>
                    <br/>
                    <label>imagenes</label>
                    {/* <input onChange={this.guardarImagenes} type="text"></input> */}
                    <input onChange={this.guardarImagenes} type="file"></input>
                    <br/>
                    <label>descripcion</label>
                    <input onChange={this.guardarDescripcion} type="text"></input>
                    <br/>
                    <label>tipoHabitacion</label>
                    <select onChange={this.guardarTipoHabitacion} ref="tipoHabitacionRef">
                        <option value="1 Persona">1 Persona</option>
                        <option value="2 Personas">2 Personas</option>
                        <option value="4 Personas">4 Personas</option>
                        <option value="Matrimonial">Matrimonial</option>
                    </select>
                    <br/>
                    <label>precio</label>
                    <input onChange={this.guardarPrecio} type="text"></input>
                    <br/>
                    <label>comodidades</label>
                    <input onChange={this.guardarComodidades} type="text"></input>
                    <br/>
                    <label>servicios</label>
                    <input onChange={this.guardarServicios} type="text"></input>
                    <br/>
                    <label>tamañoMetros2</label>
                    <input onChange={this.guardarTamañoMetros2} type="text"></input>
                    <br/>
                    <label>disponibilidad</label>
                    <input onChange={this.guardarDisponibilidad} type="date"></input>
                    <br/>

                    <button type="button" onClick={this.crearHabitacion}>crear habitacion</button>
                </form>
            </React.Fragment>
        );
    }

    crearHabitacion (e){
        //e.preventDefault();

        var data = new FormData();
        data.append('numeroHabitacion', this.numeroHabitacion);
        data.append('valoracion', this.refs.valoracionRef.value);
        data.append('imagenes', this.imagenes);
        data.append('descripcion', this.descripcion);
        data.append('tipoHabitacion', this.refs.tipoHabitacionRef.value);
        data.append('precio', this.precio);
        data.append('comodidades', this.comodidades);
        data.append('servicios', this.servicios);
        data.append('tamañoMetros2', this.tamañoMetros2);
        data.append('disponibilidad', this.disponibilidad);


        fetch ('/api/habitaciones', {
            method: 'POST',
            body: data,
        })

        // fetch ('/api/habitaciones', {
        //     headers: {"Content-Type": "application/json; charset=utf-8"},
        //     method: 'POST',
        //     body: JSON.stringify({
        //         numeroHabitacion: this.numeroHabitacion,
        //         valoracion: this.refs.valoracionRef.value,
        //         imagenes: this.imagenes,
        //         descripcion: this.descripcion,
        //         tipoHabitacion: this.refs.tipoHabitacionRef.value,
        //         precio: this.precio,
        //         comodidades: this.comodidades,
        //         servicios: this.servicios,
        //         tamañoMetros2: this.tamañoMetros2,
        //         disponibilidad: this.disponibilidad,
        //     })
        // })

        .then ((data) => {
            console.log(data);

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

    guardarNumeroHabitacion (event) {
        this.numeroHabitacion = event.target.value;
    }
    guardarValoracion (event) {
        //console.log('event', this.refs.valoracionRef.value);
        this.valoracion = event.target.value;
    }
    guardarImagenes (event) {
        console.log(event.target.files[0]);
        
        this.imagenes = event.target.files[0];
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

};

module.exports = CrearHabitacion;
