import {viaje} from '../models/viaje.js';  //viaje = db.define('viajes', { y db = db = new Sequelize('agenciadeviajes', 'root',...
import { testimonial } from '../models/testimoniales.js';
import Sequelize from "sequelize";

const paginainicio = async (req, res)=>{
    //consultar 3 viajes
    try {
        //const viajes = await viaje.findAll({limit: 3});
        //const testimoniales = await testimonial.findAll({limit: 3});
        //consulta en paralelo
        const [viajes, testimoniales] = await Promise.all([viaje.findAll({limit: 3}), testimonial.findAll({limit: 3})]);
        res.render('inicio', {pagina: 'Inicio', clase: 'home', viajes, testimoniales});
    } catch (error) {
        console.log(error);
    }
}

const paginanosotros = (req, res)=>{
    //res.send('nosotros');
    res.render('nosotros', {pagina: 'Nosotros'});
}

const paginaviajes = async (req, res)=>{
    //consultar de DB
    try {
        const viajes = await viaje.findAll();
        res.render('viajes', {pagina: 'Proximos viajes', viajes: viajes});
        // llama viajes.pug,  variables que se pasan a la vista viajes.pug
    } catch (error) {
        console.log(error);
    }
    //res.render('viajes', {pagina: 'viajes', viajes: viajes});
}

const paginadetalleviaje = async (req, res)=>{
    const detalle = req.params.slug;
    console.log(detalle);
    try {
        const resultado = await viaje.findOne({where: {slug: detalle } });
        res.render('viaje', {pagina: 'Informacion Viaje', resultado});
    } catch (error) {
        console.log(error);
    }
}

const paginatestimoniales = async (req, res)=>{  //para mostrar la pagina testimoniales
    //consultar modelo de testimoniales para treaer info de DB
    try {
        const testimoniales = await testimonial.findAll();
        res.render('testimoniales', {pagina: 'testimoniales', testimoniales});
    } catch (error) {
        
    }
}
/*
const paginacontacto = (req, res)=>{
    res.render('contacto', {pagina: 'viajes'});
}*/

export {
    paginainicio,
    paginanosotros,
    paginaviajes,
    paginadetalleviaje,
    paginatestimoniales
   // paginacontacto
}