const { Router } = require('express');

const {get,asignar} = require('./turno.controller');
const router = Router();

router.get('/turnos',get);
router.post('/turnos/asignar',asignar);

module.exports = router;