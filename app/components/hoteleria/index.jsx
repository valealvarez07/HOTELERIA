const React = require('react');
const { Link } = require('react-router-dom');

const Habitacion = require('../habitacion');

class Hoteleria extends React.Component {

  render() {
    const { habitaciones, administrador, sesionUsuario } = this.props;

    return (
      <div>

        <Link to={`/hoteleria/login`}>LOGIN</Link>
        <br />
        <Link to={`/hoteleria/register`}>REGISTRARSE</Link>
        <br />

        {sesionUsuario ?
          <div>
            <a href='/api/usuarios/cerrarSesion'>cerrar sesion</a>
          </div>
          : null}

        {administrador === 1 ?
          <div>
            <Link to={`/hoteleria/usuarios`}>ver usuarios</Link>
            <br />
            <Link to={`/hoteleria/reservas`}>ver reservas</Link>
            <br />
            <Link to={'/hoteleria/crear-habitacion'}>crear una habitacion</Link>
          </div>
          : null}

        <br />

        <ul className="hoteleria">
          {
            habitaciones.map(habitacion => (
              <Habitacion sesionUsuario={sesionUsuario} administrador={administrador} key={habitacion.numeroHabitacion} numeroHabitacion={habitacion.numeroHabitacion} valoracion={habitacion.valoracion} imagenes={habitacion.imagenes} descripcion={habitacion.descripcion} tipoHabitacion={habitacion.tipoHabitacion} precio={habitacion.precio} comodidades={habitacion.comodidades} servicios={habitacion.servicios} tamañoMetros2={habitacion.tamañoMetros2} disponibilidad={habitacion.disponibilidad} />
            ))
          }
        </ul>

        {/* <Link to={'/hoteleria/crear-usuario'}>ir a crear un usuario</Link> */}
      </div>
    );
  }
};


module.exports = Hoteleria;
