const { Router } = require('express');

const {     
CargarTiendas,
GuardarIncidencia,
CargarIncidencias,
EliminarIncidencia
} = require('../controllers/incidencias');


const router = Router();

router.get('/CargarTiendas/', CargarTiendas );
router.get('/GuardarIncidencia/', GuardarIncidencia );
router.get('/CargarIncidencias/', CargarIncidencias );
router.get('/EliminarIncidencia/', EliminarIncidencia );
router.get('/ActualizarIncidencia/', ActualizarIncidencia );



module.exports = router;
