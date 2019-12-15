const React = require('react');

const { Link } = require('react-router-dom');

class Login extends React.Component {

    render() {

        return (
            <form method="POST" action="/api/usuarios/login" encType="application/x-www-form-urlencoded">
                <label>usuario: numeroDocumento</label>
                <input type="number" name="usuario" id="usuario"></input>

                <label>contraseña</label>
                <input type="password" name="password" id="password"></input>

                <button type="submit">ENVIAR</button>
            </form>
        );
    }
};


module.exports = Login;