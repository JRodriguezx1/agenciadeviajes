//////////archivo de configuracion///////////

//const express = require('express');
import express from 'express';
import router from './routes/index.js';
//import db from './config/db.js';

import db from './config/db.js';  ///importar base e datos mysql

import dotenv from 'dotenv';
dotenv.config();


//conectar la bd
db.authenticate().then(()=>console.log('base de datos conectada')).catch(error => console.log(error));


const app = express();
//definir puerto
const port = process.env.port || 4000;

//habilitar template engiene pug
app.set('view engine', 'pug');

//obtener el año actual con middleware
app.use((req, res, next)=>{  //req es lo que se manda al servidor o solicitud, res es la respuesta del servicor
    const year = new Date();
    res.locals.actualyear = year.getFullYear();  //locals son variables internas de express y estan disponible en la visata 
    res.locals.nombresitio = "Agencia de viajes";
    return next();  //next ejecuta el sigiente middleware
    // ó
    //next();
});

//agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//deinir la carpeta publica
app.use(express.static('public'));  //definir la carpeta publica como los archivos estaticos de express

//agregar router a app
app.use('/', router); //como router tiene las rutas definidas en routes/index.js, entonces router se agrega a app

/*
app.get('/', (req, res)=>{ res.send('inicio');});
app.get('/nosotros', (req, res)=>{ res.send('nosotros');});
app.get('/contacto', (req, res)=>{ res.send('contacto');});*/

app.listen(port, ()=>{
    console.log(`el servidor funciona en el puerto: ${port}`);
});