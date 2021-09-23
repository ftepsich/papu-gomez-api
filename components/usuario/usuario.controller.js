const db = require('./usuario.sql');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const usuarioController = {};


/**
     * @description Listar Usuarios
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
usuarioController.getUsuario = async (req, res, next) => {
    try {
        let limit = req.body['limit'] || 10;
        let offset = req.body['offset'] || 0;
        const usuarios = await db.fetchAllUsuarios(limit, offset);
        return res.status(200).json(usuarios);
    } catch (error) {
        next(createError(error, 'No se pudo listar'));
    }
};

/**
     * @description Crear Usuario
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
usuarioController.createUsuario = async (req, res, next) => {
    try {
        const {username,email, id_rol} = req.body;
        const password = await bcrypt.hash(req.body.password, 10);
        const newUsuario = await db.insertUsuario(username, password, email, id_rol);
        res.status(201).send(newUsuario);

    } catch (error) {
        next(createError(error, 'No se puedo crear un nuevo registro'));
    }
};

/**
     * @description Actualizar Usuario
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
usuarioController.updateUsuario = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { username, email, id_rol } = req.body;
        const password = bcrypt.hashSync(req.body.password, 10);
        const updateUsuario = await db.updateUsuarios(username, password, email, id_rol, id);
        res.status(201).json({updateUsuario});
    } catch (error) {
        next(createError(error, 'No se puedo actualizar el registro'));
    }
};

/**
     * @description Borrar Usuario
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
usuarioController.deleteUsuario = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.deleteUsuarios(id);
        return res.status(200).send(`Se elimino el usuario con el ID:  ${id}`);
    } catch (error) {
        next(createError(error, 'No se pudo borrar el registro'));
    }
};

module.exports = usuarioController;