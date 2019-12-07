const React = require('react');
const Habitacion = require('../habitacion');
const Login = require('../login');
const Registro = require('../register');
const Reservas = require('../crear-reserva');
const Reserva = require('../reserva');

const {Link} = require('react-router-dom');

class Hoteleria extends React.Component {

    render() {
        const {reservas} = this.props;
        console.log(this.props.sesionUsuario);
        

        return (

          <div>
            <ul className="hoteleria">
              {
                reservas.map(reserva => (
                  <Reserva key={reserva.numeroReserva} numeroReserva={reserva.numeroReserva} idUsuario={reserva.idUsuario} numeroHabitacion={reserva.numeroHabitacion} fechaLlegada={reserva.fechaLlegada} fechaSalida={reserva.fechaSalida} modoPago={reserva.modoPago} cantidadHuespedes={reserva.cantidadHuespedes}/>
                ))
              }
            </ul>
            
            
          </div>
        );
    }
};


module.exports = Hoteleria;
