const React = require('react');

class EliminarReserva extends React.Component {

    constructor(props) {
        super(props);

        this.eliminarHabitacion = this.eliminarHabitacion.bind(this);

        this.state = {
            reserva: {},
            loading: false,
            error: null,
            redireccionar: false,
        }
    }
    
    render() {
        
        if (this.state.loading) {
            return (
                <div>Cargando...</div>
            )
        }

        if (this.state.error) {
            return (
                <div>Error</div>
            )
        }       
        
        if (this.state.redireccionar) {
            return (
                window.location.href = "/hoteleria"
            )
        }

        return (

            <React.Fragment>

                        <button onClick={this.eliminarHabitacion}>eliminar habitacion</button>
                
            </React.Fragment>
        );
    }

    eliminarHabitacion (){
        fetch (`/api/reservas/${this.props.numeroReserva}`, {
            headers: {"Content-Type": "application/json; charset=utf-8"},
            method: 'DELETE',
        })
    
        .then ((data) => {
            this.setState ({ 
                redireccionar: true,
            }); 
          
      })
    
      .catch(() => {
          this.setState ({ 
              error: true,
          });
      });
      
    }
};

module.exports = EliminarReserva;
