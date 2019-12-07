require('@babel/register')({
    ignore: ['node_modules'],
  });
  
  const express = require('express');
  const bodyParser = require('body-parser');
  const config = require('./config');
  const apiRouter = require('./api');
  const appRouter = require('./app');

  const multer =require('multer');

  const upload = multer({ dest: 'dist/imagenes/'});
  
  const app = express();
  
  // Configuraciones de express
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/app/views');
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use(express.static(config.static));
  
  // Asignar middlewares globales
  // app.use(bodyParser);
  
  app.use('/api', apiRouter);
  app.use(appRouter);

  module.exports = app;