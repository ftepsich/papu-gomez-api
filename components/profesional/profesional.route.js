const { Router } = require('express');
const {getProfesionales} =  require('./profesional.controller.js');
const router = Router();

/*Obras Sociales*/
router.get('/profesionales', getProfesionales);

module.exports = router;