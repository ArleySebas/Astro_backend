const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


const { LSC_APP_MONGODB_HOST } = process.env;

//Inicializaciones
const app = express();

//Configuraciones
app.set('port', process.env.PORT || 4000);

//Middlewares;
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //interpreta los datos enviados desde un html convirtiéndolos en un objeto
app.use(express.json());
app.use(bodyParser.json());
app.use(cors())

const sessionStore = MongoStore.create({
    mongoUrl: LSC_APP_MONGODB_HOST,
    mongooseConnection: mongoose.connection,
    dbName: 'LSC-app'
});
app.use(session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 5,
    }
}));


//Variables globales



//Rutas
app.use(require('./routes/index.routes'));

module.exports = app;
