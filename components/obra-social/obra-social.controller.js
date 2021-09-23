const obraSocialSql = require('./obra-social.sql');
const createError = require('http-errors');
const obraSocialController = {};
/**
     * @description Listar Obras Sociales
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
obraSocialController.getObrasSociales = async (req, res, next) => {
    try {
        let limit = req.body['limit'] || 10;
        let offset = req.body['offset'] || 0;
        const obrasSociales = await obraSocialSql.fetchAll(limit, offset);
        return res.status(200).json(obrasSociales);
    } catch (error) {
        next(res.status(400).json({error: error}));
    }
};

/**
     * @description Lista Obra Social por id
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
obraSocialController.getObraSocialById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const obra_social = await obraSocialSql.getObraSocialById(id);
        return res.status(200).json(obra_social);
    } catch (error) {
        next(createError(401, error, 'No se pudo encontrar la obra social'));
    }
};

/**
     * @descritption Agregar Obra Social
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
obraSocialController.createObraSocial = async (req, res ,next) => {
    try {
        const {nombre, descripcion} = req.body;
        if(!nombre)
            return next(res.status(400).send({message: 'Nombre es requerido'}));
        const newObraSocial =  await obraSocialSql.insert(nombre, descripcion);
        return res.status(201).json({newObraSocial});
    } catch (error) {
        next(res.status(400).send('No se pudo agregar una nueva obra social'));

    }
  
};

/**
     * @description Actualizar Obra Social
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
obraSocialController.updateObraSocial = async (req,res, next) => {
    try {
        const { nombre, descripcion } = req.body;
        const id = req.params.id;
        const updateObraSocial = await obraSocialSql.update(nombre, descripcion,id);
        return res.status(200).json({updateObraSocial});
    } catch (error) {
        next(res.status(401).send('No se pudo actualizar la obra social'));
    }
};

/**
     * @description Borrar Obra Social
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
obraSocialController.removeObraSocial = async (req, res, next) => {
    try {
        const id = req.params.id;
        await obraSocialSql.deleteObraSocial(id);
        return res.status(200).send(`Se eliminó la obra social con el ID: ${id}`);
    } catch (error) {
        next(res.status(401).send('No se pudo borar la obra social'));
    }
};

module.exports = obraSocialController;