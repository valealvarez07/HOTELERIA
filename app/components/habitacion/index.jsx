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
        <h3><Link to = {`/hoteleria/habitacion/${this.props.numeroHabitacion}`}>numeroHabitacion: {this.props.numeroHabitacion}, tipoHabitacion: {this.props.tipoHabitacion}</Link></h3>
          <p>valoracion: {this.props.valoracion}</p>

          <Link to = {`/hoteleria/crear-reserva`}>reservar habitacion</Link>

          <hr/>
        </li>
      </React.Fragment>
    );
  }  
};

module.exports = Habitacion;