const db = require('../../database/config');

/**
     * @description Lista los profesionales
     * @return {Array<JSON>}
     */
module.exports.fetchAll = async () => {
	const profesionales = await db.query('SELECT p.Id,u.username from profesionales p join usuarios u on p.id_usuario = u.Id WHERE u.id_rol = 4');
	return profesionales.rows;
};


