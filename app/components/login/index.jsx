const React = require('react');

const { Link } = require('react-router-dom');

class Login extends React.Component {
    render() {

        return (
            <form method="POST" action="/api/usuarios/login" enctype="application/x-www-form-urlencoded">
                <label>usuario: numeroDocumento</label>
                <input type="text" name="usuario" id="usuario"></input>

                <label>contraseña</label>
                <input type="text" name="password" id="password"></input>

                <button type="submit">ENVIAR</button>
            </form>
        );
    }
};


module.exports = Login;