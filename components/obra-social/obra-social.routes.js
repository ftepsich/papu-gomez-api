const { Router } = require('express');
const {getObrasSociales, getObraSocialById, createObraSocial, updateObraSocial, removeObraSocial} = require('./obra-social.controller');
const router = Router();

/*Obras Sociales*/
router.get('/obras-sociales', getObrasSociales);
router.get('/obras-sociales/:id', getObraSocialById);
router.post('/obras-sociales', createObraSocial);
router.put('/obras-sociales/:id', updateObraSocial);
router.delete('/obras-sociales/:id', removeObraSocial);

module.exports = router;