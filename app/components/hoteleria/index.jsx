const React = require('react');
const Habitacion = require('../habitacion');

const {Link} = require('react-router-dom');

class Hoteleria extends React.Component {

    render() {
        const {habitaciones} = this.props;

        return (
          <div>
            <Link to = {`/hoteleria/usuarios`}>usuarios</Link>

            <ul className="hoteleria">
              {
                habitaciones.map(habitacion => (
                  <Habitacion key={habitacion.numeroHabitacion} numeroHabitacion={habitacion.numeroHabitacion} valoracion={habitacion.valoracion} imagenes={habitacion.imagenes} descripcion={habitacion.descripcion} tipoHabitacion={habitacion.tipoHabitacion} precio={habitacion.precio} comodidades={habitacion.comodidades} servicios={habitacion.servicios} tamañoMetros2={habitacion.tamañoMetros2} disponibilidad={habitacion.disponibilidad} />
                ))
              }
            </ul>
            <br/>
            <Link to = {'/hoteleria/crear-habitacion'}>ir a crear una habitacion</Link>
            <br/>
            <Link to = {'/hoteleria/crear-usuario'}>ir a crear un usuario</Link>
          </div>
        );
    }
};


module.exports = Hoteleria;
