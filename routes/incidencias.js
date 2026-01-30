const { Router } = require('express');

const {     
CargarTiendas,
GuardarIncidencia,
CargarIncidencias,
EliminarIncidencia,
ActualizarEstadoIncidencia,
Keepalive,
Status
} = require('../controllers/incidencias');


const router = Router();

router.get('/CargarTiendas/', CargarTiendas );
router.get('/GuardarIncidencia/', GuardarIncidencia );
router.get('/CargarIncidencias/', CargarIncidencias );
router.get('/EliminarIncidencia/', EliminarIncidencia );
router.get('/ActualizarIncidencia/', ActualizarIncidencia );
router.get('/ActualizarEstadoIncidencia/', ActualizarEstadoIncidencia );
router.get('/Keepalive/', Keepalive );
router.get('/Status/', Status );

module.exports = router;
