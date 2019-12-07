const React = require('react');
const Usuario = require('../usuario');

const {Link} = require('react-router-dom');

class Usuarios extends React.Component {
    render() {
        const {usuarios} = this.props;

        return (
          <div>
            <ul className="">
              {
                usuarios.map(usuario => (
                  <Usuario key={usuario.id} id={usuario.id} tipoDocumento={usuario.tipoDocumento} numeroDocumento={usuario.numeroDocumento} nombre={usuario.nombre} sexo={usuario.sexo} edad={usuario.edad} telefono={usuario.telefono} direccion={usuario.direccion} email={usuario.email} administrador={usuario.administrador} contraseña={usuario.contraseña}/>
                ))
              }
            </ul>
            <br/>
            <Link to = {'/hoteleria/crear-usuario'}>ir a crear un usuario</Link>
          </div>
        );
    }
};


module.exports = Usuarios;
