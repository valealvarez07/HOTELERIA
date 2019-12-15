const React = require('react');
const {Route} = require('react-router-dom');

const Hoteleria = require('../../components/hoteleria');

const CrearHabitacion = require('../../components/crear-habitacion');
const CrearUsuario = require('../../components/crear-usuario');
const CrearReserva = require('../../components/crear-reserva');
const ModificarHabitacion = require('../../components/modificar-habitacion');

const Usuarios = require('../../components/usuarios');
const Reservas = require('../../components/reservas');
const Login = require('../../components/login');
const Registro = require('../../components/register');

class HoteleriaPage extends React.Component {

    render() {
        const { habitaciones, usuarios, reservas, sesionUsuario,administrador } = this.props.initialState;

        return (

            <React.Fragment>
                <Route
                    exact
                    path = "/hoteleria/login"
                    render = {(props) => <Login {...props} />}
                />
                <Route
                    exact
                    path = "/hoteleria/register"
                    render = {(props) => <Registro {...props} />}
                />
                <Route
                    exact
                    path = "/hoteleria"
                    render = {(props) => <Hoteleria {...props} administrador={administrador} sesionUsuario={sesionUsuario} habitaciones={habitaciones}/>}
                   // render = {(props) => <Habitacion {...props} habitaciones={habitaciones} />}
                />
                <Route
                    exact
                    path = "/hoteleria/usuarios"
                    render = {(props) => <Usuarios {...props} usuarios={usuarios} />}
                />
                 <Route
                    exact
                    path = "/hoteleria/reservas"
                    render = {(props) => <Reservas {...props} reservas={reservas} />}
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
