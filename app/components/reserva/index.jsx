const React = require('react');
const {Link} = require('react-router-dom');

class Reserva extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <li>
          <h3>numeroReserva: {this.props.numeroReserva}</h3>
        </li>
      </React.Fragment>
    );
  }  
};

module.exports = Reserva;