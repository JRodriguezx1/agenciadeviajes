import {testimonial} from '../models/testimoniales.js';

const guardartestimoniales =async (req, res)=>{
    console.log(req.body);
    //validar datos del formulario
    const {nombre, correo, mensaje} = req.body;
    const errores = [];
    
    if(nombre.trim() === ''){
        errores.push({mensaje: 'EL nombre esta vacio'});
    }
    if(correo.trim() === ''){
        errores.push({mensaje: 'EL correo esta vacio'});
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje: 'EL mensaje esta vacio'});
    }
    
    if(errores.length>0){
        const testimoniales = await testimonial.findAll();
        res.render('testimoniales', {pagina: 'testimoniales', testimoniales, errores, nombre, correo, mensaje});
    }else{
        //almacenar en DB
        try {
            await testimonial.create({nombre, correo, mensaje});
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}

export { guardartestimoniales};