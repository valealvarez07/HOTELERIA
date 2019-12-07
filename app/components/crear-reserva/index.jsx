const React = require('react');
const { Redirect } = require('react-router-dom');

class CrearReserva extends React.Component {

    constructor(props) {
        super(props);

        this.guardarNumeroReserva = this.guardarNumeroReserva.bind(this);
        this.guardarIdUsuario = this.guardarIdUsuario.bind(this);
        this.guardarNumeroHabitacion = this.guardarNumeroHabitacion.bind(this);
        this.guardarFechaLlegada = this.guardarFechaLlegada.bind(this);
        this.guardarFechaSalida = this.guardarFechaSalida.bind(this);
        this.guardarModoPago = this.guardarModoPago.bind(this);
        this.guardarCantidadHuespedes = this.guardarCantidadHuespedes.bind(this);

        this.crearReserva = this.crearReserva.bind(this);

        this.state = {
            reserva: {},
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
        

        return (

            <React.Fragment>
                <form>
                    <label>idUsuario</label>
                    <input onChange={this.guardarIdUsuario} name="" type="text"></input>
                    <br/>
                    <label>numeroHabitacion</label>
                    <input onChange={this.guardarNumeroHabitacion} name="" type="text"></input>
                    <br/>
                    <label>fechaLlegada</label>
                    <input onChange={this.guardarFechaLlegada} name="" type="text"></input>
                    <br/>
                    <label>fechaSalida</label>
                    <input onChange={this.guardarFechaSalida} name="" type="text"></input>
                    <br/>
                    <label>modoPago</label>
                    <select onChange={this.guardarModoPago} ref="modoPagoRef">
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta</option>
                    </select>
                    <br/>
                    <label>cantidadHuespedes</label>
                    <input onChange={this.guardarCantidadHuespedes} name="" type="text"></input>
                    <br/>

                    <button type="button" onClick={this.crearReserva}>crear reserva</button>
                </form>
            </React.Fragment>
        );
    }

    crearHabitacion (e){
        //e.preventDefault();
        fetch ('/api/reservas', {
            headers: {"Content-Type": "application/json; charset=utf-8"},
            method: 'POST',
            body: JSON.stringify({
                numeroReserva: this.numeroReserva,
                idUsuario: this.idUsuario,
                numeroHabitacion: this.numeroHabitacion,
                fechaLlegada: this.fechaLlegada,
                fechaSalida: this.fechaSalida,
                modoPago: this.refs.modoPagoRef.value,
                cantidadHuespedes: this.cantidadHuespedes,
            })
        })

        .then ((data) => {
            //console.log(data);

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

    guardarNumeroReserva (event) {
        this.numeroReserva = event.target.value;
    }
    guardarIdUsuario (event) {
        //console.log('event', this.refs.valoracionRef.value);
        this.idUsuario = event.target.value;
    }
    guardarNumeroHabitacion (event) {
        this.numeroHabitacion = event.target.value;
    }
    guardarFechaLlegada (event) {
        this.fechaLlegada = event.target.value;
    }
    guardarFechaSalida (event) {
        this.fechaSalida = event.target.value;
    }
    guardarModoPago (event) {
        this.modoPago = event.target.value;
    }
    guardarCantidadHuespedes (event) {
        this.cantidadHuespedes = event.target.value;
    }
};

module.exports = CrearReserva;
