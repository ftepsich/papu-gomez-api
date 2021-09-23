const { Router } = require('express');
const {getPaciente,getPacienteById,createPaciente,updatePaciente,deletePaciente} = require('./paciente.controller');
const router = Router();

/*Pacientes*/
router.get('/pacientes', getPaciente);
router.get('/pacientes/:id', getPacienteById);
router.post('/pacientes', createPaciente);
router.put('/pacientes/:id', updatePaciente);
router.delete('/pacientes/:id', deletePaciente);

module.exports = router;