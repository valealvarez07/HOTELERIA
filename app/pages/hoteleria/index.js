const router = require('express').Router();
const {StaticRouter} = require('react-router-dom');
const React = require('react');
const { renderToString } = require('react-dom/server');
const Habitacion = require('../../../models/habitaciones');
const Usuarios = require('../../../models/usuarios');
const Reservas = require('../../../models/reservas');
const View = require('./view');

router.get('/', (req, res, next) => {

  const promesaHabitaciones = Habitacion.obtenerTodasHabitaciones();
  const promesaUsuarios = Usuarios.obtenerTodosUsuarios();
  const promesaReservas = Reservas.obtenerTodasReservas();

  //const promesaUsuarios = Usuarios.obtenerUsuarioPorAdmin();
  

  Promise.all([promesaHabitaciones, promesaUsuarios, promesaReservas])
    .then(([habitaciones, usuarios, reservas]) => {
      const initialState = {
        habitaciones,
        usuarios,
        reservas,
        sesionUsuario: req.session.sesionUsuario ? req.session.sesionUsuario : '',
        administrador: req.session.administrador ? req.session.administrador : '',
      };

      const context = {};

      const content = renderToString(
        <StaticRouter location={req.url} context={context}>
          <View initialState={initialState}/>
        </StaticRouter>
      );
  
      res.render('template', {
        pageName: 'hoteleria',
        pageTitle: 'HOTELERIA',
        initialState,
        content
      });
    }).catch(err => next(err));
  });


    
  //   Habitacion.obtenerTodasHabitaciones()
  //   .then (habitaciones => {
  //       //res.render ('habitaciones', {
  //       //    habitaciones: habitaciones,
  //       //})
  //       const initialState = {
  //           habitaciones,
  //       };

  //       const context = {};

  //       const content = renderToString(
  //         <StaticRouter location={req.url} context={context}>
  //           <View initialState={initialState}/>
  //         </StaticRouter>
  //       );

  //       res.render('template', {
  //         pageName: 'hoteleria',
  //         pageTitle: 'HOTELERIA',
  //         initialState,
  //         content
  //       });
  //   })

  //   .catch(err => {
  //     next(err);
  //   });
  // });
  

module.exports = router;