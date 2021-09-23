const db = require('../../database/config');

/**
     * @param {Number} limit
     * @param {Number} offset
     * @returns {Array<JSON>}
     */
module.exports.fetchAllUsuarios = async (limit, offset) => {
    try {
        const usuarios = await db.query('SELECT username, password, email FROM usuarios ORDER BY username ASC LIMIT $1 OFFSET $2', [limit, offset]);
        return usuarios.rows;
    } catch (error) {
        await db.query('ROLLBACK');
        throw error;
    }
};
  
/**
     * @param {Text} username
     * @param {Text} password
     * @param {Text} email
     * @param {Number} id_rol
     * @returns {Boolean}
*/
module.exports.insertUsuario = async (username, password, email, id_rol) => {
    try {
        const newUsuario = await db.query(`
                INSERT INTO usuarios 
                    (username, password, email, id_rol)
                VALUES 
                    ($1, $2, $3, $4)
                RETURNING *`,
        [username, password, email, id_rol]
        );
        return newUsuario.rows[0].id;
    } catch (error) {
        await db.query('ROLLBACK');
        throw error;
    }
};

/**
     * @param {Text} username
     * @param {Text} password
     * @param {Number} id_rol
     * @param {Number} id
     * @returns {Boolean}
     */
module.exports.updateUsuarios = async (username, password, email, id_rol, id) => {
    try {
        const usuario = await db.query('UPDATE usuarios SET username = $1,password = $2,email = $3,id_rol = $4 WHERE id = $5', [username, password, email, id_rol, id]);
        return usuario;
    } catch (error) {
        await db.query('ROLLBACK');

        throw error;
    }
};


/**
     * @param {Number} id
     * @returns {Boolean}
*/
module.exports.deleteUsuariosById = async (id) => {
    try {
        const removeUsuario = await db.query('DELETE FROM USUARIOS WHERE id = $1', [id]);
        return removeUsuario;
    } catch (error) {
        await db.query('ROLLBACK');
        throw error;
    }
};

module.exports.deleteUsuarios = async () => {
    try {
        const removeUsuario = await db.query('DELETE FROM USUARIOS');
        return removeUsuario;
    } catch (error) {
        await db.query('ROLLBACK');
        throw error;
    }
};