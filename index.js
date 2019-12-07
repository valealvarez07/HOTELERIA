
const config = require('./config');
const app = require('./server');

app.listen(config.PORT, () => {
    console.log('Aplicación levantanda')
});

