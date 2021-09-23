const { Router } = require('express');
const {get, create, update, removeRol } = require('./rol.controller');
const router = Router();

/*Roles*/
router.get('/roles', get);
router.post('/roles', create);
router.put('/roles/:id', update);
router.delete('/roles/:id', removeRol);

module.exports = router;