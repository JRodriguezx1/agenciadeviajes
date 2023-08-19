import express from "express";
import { paginainicio, paginanosotros, paginaviajes, paginadetalleviaje, paginatestimoniales } from "../controllers/paginascontroller.js";
import { guardartestimoniales } from "../controllers/testimonialcontroller.js";

const router = express.Router();

router.get('/', paginainicio);

router.get('/nosotros', paginanosotros);

router.get('/viajes', paginaviajes);
router.get('/viajes/:slug', paginadetalleviaje);

router.get('/testimoniales', paginatestimoniales);
router.post('/testimoniales', guardartestimoniales);

router.get('/contacto', (req, res)=>{
    res.send('contacto');
});

export default router;