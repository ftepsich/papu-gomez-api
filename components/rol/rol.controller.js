const rolSql = require('./rol.sql.js');
const createError = require('http-errors');
const rolController = {};


/**
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
rolController.get = async (req, res, next) => {
	try {
		const roles = await rolSql.fetchAll();
		res.send(roles);
	} catch (error) {
		next(createError(error, 'No se pudieron listar los roles'));
	}
};

/**
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
rolController.create = async (req, res, next) => {
	try {
		const { rol_tipo, descripcion } = req.body;
		const rol = await rolSql.insert(rol_tipo, descripcion);
		res.send(rol);
	} catch (error) {
		next(createError(error, 'No se pudo crear un nuevo rol'));
	}
};

/**
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
rolController.update = async (req, res, next) => {
	try {
		const { rol_tipo, descripcion } = req.body;
		const id = req.params.id;
		const rol = await rolSql.update(id, rol_tipo, descripcion);
		res.send(rol);
	} catch (error) {
		next(createError(error, 'No se pudo actualizar el rol'));
	}
};

/**
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
rolController.removeRol = async (req, res, next) => {
	try {
		const id = req.params.id;
		const rol = await rolSql.deleteRol(id);
		res.send(rol);
	} catch (error) {
		next(createError(error, 'No se pudo eliminar el rol'));
	}
};

module.exports = rolController;