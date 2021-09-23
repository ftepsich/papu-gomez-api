const db = require('../../database/config');

/**
     * @return {Array<JSON>}
     */
module.exports.selectAll = async () => {
    try{
        const roles = await db.query('SELECT * FROM roles');
        return roles.rows;
    } catch(error){
        throw error;
    }
};

/**
     * @param {String} rol_tipo
     * @param {Text} descripcion
     * @return {Boolean}
     */
module.exports.insert = async (rol_tipo, descripcion='') => {
    try {
        await db.query('BEGIN');
        const newRol = await db.query(`
                INSERT INTO roles 
                    (rol_tipo,descripcion)
                VALUES ($1,$2)`,
        [rol_tipo, descripcion]
        );
        await db.query('COMMIT');
        return newRol.rowCount == 1;
    } catch(error){
        await db.query('ROLLBACK');
        throw error;
    }
};

/**
     * @param {Number} id
     * @param {String} rol_tipo
     * @param {Text} descripcion
     * @return {Boolean}
     */
module.exports.update = async (id, rol_tipo, descripcion='') => {
    try {
        await db.query('BEGIN');
        const rol = await db.query('UPDATE roles SET rol_tipo = $1,descripcion = $2 WHERE ID = $3 ', [rol_tipo, descripcion, id]);
        await db.query('COMMIT');
        return rol.rowCount == 1;
    } catch(error) {
        await db.query('ROLLBACK');
        throw error;
    }
};

/**
     * @param {Number} id
     * @return {Boolean}
     */
module.exports.deleteRol = async (id) => {
    try {
        await db.query('BEGIN');
        const removedRol = await db.query('DELETE FROM roles where ID = $1', [id]);
        await db.query('COMMIT');
        return removedRol.rowCount == 1;
    } catch(error) {
        await db.query('ROLLBACK');
        throw error;
    }
};