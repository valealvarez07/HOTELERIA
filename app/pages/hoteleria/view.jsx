const React = require('react');
const {Route} = require('react-router-dom');

const Hoteleria = require('../../components/hoteleria');
//const Habitacion = require('../../components/habitacion');
const CrearHabitacion = require('../../components/crear-habitacion');
const CrearUsuario = require('../../components/crear-usuario');
const CrearReserva = require('../../components/crear-reserva');
const ModificarHabitacion = require('../../components/modificar-habitacion');

const Usuarios = require('../../components/usuarios');

class HoteleriaPage extends React.Component {

    render() {
        const { habitaciones } = this.props.initialState;
        const { usuarios } = this.props.initialState;

        return (

            <React.Fragment>
                <Route
                    exact
                    path = "/hoteleria"
                    render = {(props) => <Hoteleria {...props} habitaciones={habitaciones}/>}
                   // render = {(props) => <Habitacion {...props} habitaciones={habitaciones} />}
                />
                <Route
                    exact
                    path = "/hoteleria/usuarios"
                    render = {(props) => <Usuarios {...props} usuarios={usuarios} />}
                />
                <Route
                    exact
                    path = "/hoteleria/crear-habitacion"
                    render = {(props) => <CrearHabitacion {...props} />}
                />
                <Route
                    exact
                    path = "/hoteleria/crear-usuario"
                    render = {(props) => <CrearUsuario {...props} />}
                />
                <Route
                    exact
                    path = "/hoteleria/crear-reserva"
                    render = {(props) => <CrearReserva {...props} />}
                />
                <Route
                    path = "/hoteleria/habitacion/:numeroHabitacion"
                    render = {(props) => <ModificarHabitacion {...props} numeroHabitacion={props.match.params.numeroHabitacion} />}
                />
            </React.Fragment>
        );
}
};

module.exports = HoteleriaPage;
