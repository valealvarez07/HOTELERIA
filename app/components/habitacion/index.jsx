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
          <h3>numeroHabitacion: {this.props.numeroHabitacion}  ----  tipoHabitacion: {this.props.tipoHabitacion}  ----  precio: ${this.props.precio}</h3>
          <p>valoracion: {this.props.valoracion}</p>
          <img alt='imgHabitacion' src={`/imagenes/${this.props.imagenes}`}></img>
          <p>descripcion: {this.props.descripcion}</p>
          <p>comodidades: {this.props.comodidades}</p>
          <p>servicios: {this.props.servicios}</p>
          <p>tamañoMetros2: {this.props.tamañoMetros2}</p>
          <p>disponibilidad: {this.props.disponibilidad}</p>

          {this.props.sesionUsuario ?
          <div>
            <Link to = {`/hoteleria/crear-reserva`}>reservar habitacion</Link>
          </div>
          : null}

          <br/>

          {this.props.administrador === 1 ?
              <Link to={`/hoteleria/habitacion/${this.props.numeroHabitacion}`}>modificar habitacion</Link>
           : null}

          <hr/>
        </li>
        
      </React.Fragment>
    );
  }  
};

module.exports = Habitacion;