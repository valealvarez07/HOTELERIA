const React = require('react');
const {Link} = require('react-router-dom');

class Usuario extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <li>
          <h3>nombre: {this.props.nombre}  --- administrador: {this.props.administrador}</h3>
          <Link to = {`/hoteleria/usuario/${this.props.id}`}>modificar usuario</Link>
        </li>
      </React.Fragment>
    );
  }  
};

module.exports = Usuario;