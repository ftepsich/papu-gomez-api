const { Router } = require('express');
const {getUsuario, createUsuario, updateUsuario, deleteUsuario} = require('./usuario.controller');
//const usuarioSchema = require('./validateUsuarioSchema')

const router = Router();

/*Usuarios*/
router.get('/usuarios', getUsuario);
router.post('/usuarios', createUsuario);
router.put('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id', deleteUsuario);

module.exports = router;