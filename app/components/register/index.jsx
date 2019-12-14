
const React = require('react');

const { Link } = require('react-router-dom');

class Registro extends React.Component {
    render() {

        return (

            <form method="POST" action="/api/usuarios" encType="application/x-www-form-urlencoded">
                <label>nombre de usuario: numeroDocumento</label>
                <input type="text" name="numeroDocumento" id="usuario"></input>

                <label>contraseña</label>
                <input type="text" name="contraseña" id="contraseña"></input>

                <br />
                <label>tipoDocumento</label>
                <input name="tipoDocumento" type="text"></input>
                <br />
                <label>nombre</label>
                <input name="nombre" type="text"></input>
                <br />
                <label>sexo</label>
                <select name="sexo">
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                </select>
                <br />
                <label>edad</label>
                <input name="edad" type="text"></input>
                <br />
                <label>telefono</label>
                <input name="telefono" type="text"></input>
                <br />
                <label>direccion</label>
                <input name="direccion" type="text"></input>
                <br />
                <label>email</label>
                <input name="email" type="text"></input>
                <br />
                <label>administrador</label>
                <select name="administrador">
                    <option value="1">Si</option>
                    <option value="0">No</option>
                </select>
                {/* <input type="checkbox" name="administrador" value="1">Si</input>
                <input type="checkbox" name="administrador" value="0">No</input> */}

                <br />

                <button type="submit">CREAR USUARIO</button>
            </form>
        );
    }
};


module.exports = Registro;

