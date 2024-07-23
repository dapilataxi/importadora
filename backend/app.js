'use strict'
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;
var cliente_route = require('./routes/cliente');
var admin_route = require('./routes/admin');
var producto_route = require('./routes/producto');
var cupon_route = require('./routes/cupon');
const cors = require('cors');

async function startServer() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/importadora');
        console.log('Conexión a la base de datos establecida');
        app.listen(port, function() {
            console.log('Servidor Corriendo en el puerto ' + port);
        });
    } catch (err) {
        console.log('Error al conectar a la base de datos:', err);
    }

}

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb', extended: true }));


app.use(cors());
app.use('/api',cliente_route);
app.use('/api',admin_route);
app.use('/api',producto_route);
app.use('/api',cupon_route);
startServer();

module.exports = app;