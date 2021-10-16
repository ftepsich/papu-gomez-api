const profesionalSql = require('./profesional.sql.js');
const profesionalController = {};
/**
     * @description Listar Obras Sociales
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
profesionalController.getProfesionales = async (req, res, next) => {
	try {
		let limit = req.body['limit'] || 10;
		let offset = req.body['offset'] || 0;
		const profesionales = await profesionalSql.fetchAll(limit, offset);
		return res.status(200).json(profesionales);
	} catch (error) {
		next(res.status(400).json({error: error}));
	}
};
module.exports = profesionalController;