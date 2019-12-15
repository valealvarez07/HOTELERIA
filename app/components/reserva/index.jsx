const React = require('react');
const {Link} = require('react-router-dom');

class Reserva extends React.Component {

  constructor(props) {
    super(props);

    this.eliminarReserva = this.eliminarReserva.bind(this);

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
            window.location.href = "http://localhost:3000/hoteleria/reservas"
        )
    }

    return (
      <React.Fragment>

        <li>
          <h3>numeroReserva: {this.props.numeroReserva}</h3>
          <p>idUsuario: {this.props.idUsuario}</p>
          <p>numeroHabitacion: {this.props.numeroHabitacion}</p>
          <p>fechaLlegada: {this.props.fechaLlegada}</p>
          <p>fechaSalida: {this.props.fechaSalida}</p>
          <p>modoPago: {this.props.modoPago}</p>
          <p>cantidadHuespedes: {this.props.cantidadHuespedes}</p>

          <button onClick={this.eliminarReserva}>eliminar reserva</button>

        </li>

      </React.Fragment>
    );
  }  

  eliminarReserva (){
    fetch (`/api/reservas/${this.props.numeroReserva}`, {
        headers: {"Content-Type": "application/json; charset=utf-8"},
        method: 'DELETE',
    })

    .then ((data) => {
        this.setState ({ 
            redireccionar: true,
        }); 
      
    })

    .catch((err) => {
        this.setState ({ 
            error: true,
        });
        console.log(err);
    });
    
  }

};

module.exports = Reserva;