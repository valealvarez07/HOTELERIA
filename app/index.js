
// aca solo defino las rutas

const router = require('express').Router();
const routerHoteleria = require('./pages/hoteleria');

const register =  require('./pages/register');
const session = require('express-session');

const { appErrorHandler } = require('../middlewares/error-handler');

router.use('/hoteleria', routerHoteleria);
router.use(appErrorHandler);

//router.use('/register', register(connection));
router.use('/register', register);

router.use(session({
    secret: 'my secret',
    cookie: {maxAge: 43200000}, //12hs
    resave: false,
    saveUninitialized: true,
}));

//app.use('/login', login(connection));
//app.use('/admin', autenticacionUsuario);
//app.use('/login', autenticacionUsuario);

module.exports = router;