const React = require('react');
const {Link} = require('react-router-dom');

class Habitacion extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <li>
          <h3>numeroHabitacion: {this.props.numeroHabitacion}  --- valoracion: {this.props.valoracion}  ---  tipoHabitacion: {this.props.tipoHabitacion}</h3>
          <Link to = {`/hoteleria/habitacion/${this.props.numeroHabitacion}`}>modificar habitacion</Link>

          <br/>
          <Link to = {`/hoteleria/crear-reserva`}>reservar habitacion</Link>
        </li>
      </React.Fragment>
    );
  }  
};

module.exports = Habitacion;