const db = require('../../database/config');
/**
     * @description Listar Obras Sociales
     * @returns {Array<JSON>}
     */
    
module.exports.fetchAll = async (limit, offset) => {
    const obras_sociales = await db.query('SELECT * FROM obras_sociales ORDER BY nombre ASC LIMIT $1 OFFSET $2', [limit, offset]);
    return obras_sociales.rows;
    
};

/**
     * @description Listar Obra Social por id
     * @param {Number} id
     * @returns {JSON}
     */
module.exports.fetchById = async (id) => {
    const obra_social = await db.query('SELECT * FROM obras_sociales WHERE ID = $1', [id]);
    return obra_social.rows[0];
    
    
};

/**
     * @description Crear Obra Social
     * @param {String} nombre
     * @param {String} descripcion
     * @returns {Boolean}
     * @todo returns  {Number} id
     */
module.exports.insert = async (nombre, descripcion) => {
    try {
        await db.query('BEGIN');
        const newObraSocial = await db.query('INSERT INTO obras_sociales (nombre,descripcion) VALUES ($1,$2) RETURNING *', [nombre, descripcion]);
        await db.query('COMMIT');
        return newObraSocial.rows[0];
    } catch (error) {
        await db.query('ROLLBACK');
        throw error;
    }
};

/**
     * @description Actualizar Obra Social
     * @param {String} nombre
     * @param {String} descripcion
     * @param {Number} id
     * @returns {Boolean}
     */
module.exports.update = async (nombre, descripcion, id) => {
    try {
        await db.query('BEGIN');
        const obraSocial = await db.query('UPDATE obras_sociales SET nombre = $1,descripcion = $2 WHERE ID = $3 ', [nombre, descripcion, id]);
        await db.query('COMMIT');
        return obraSocial.rowCount == 1;
    } catch (error) {
        await db.query('ROLLBACK');
        throw error;
    }
};

/**
     * @description Eliminar Obra Social
     * @param {Number} id
     * @returns {Boolean}
     */
module.exports.deleteObraSocial = async (id) => {
    try {
        const removedObraSocial = await db.query('DELETE FROM obras_sociales where ID = $1', [id]);
        return removedObraSocial;
    } catch (error) {
        await db.query('ROLLBACK');
        throw error;
    }
};