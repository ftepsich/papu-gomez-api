/* eslint-disable no-useless-catch */
const db = require('../../database/config');

/**
     * @param {String} username
     * @returns {JSON}
     */
module.exports.usuarioByUsername = async (username) => {
    try {
        const {rows: [usuario]} = await db.query('select * from usuarios where username = $1', [username]);
        return usuario;
    } catch (error){
        throw error;
    }
};

/**
     * @param {String} email
     * @returns {JSON}
     */
module.exports.getUsuarioByEmail = async (email) => {
    try{
        const {rows: [usuario]} = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        return usuario;
    } catch(error){
        throw error;
    }
};

/**
     * @param {Number} id_rol
     * @returns {JSON}
     */
module.exports.getRolUsuario = async (id_rol) => {
    try{
        const {rows: [rol]} = await db.query('select rol_tipo from roles where id = $1', [id_rol]);
        return rol;
    } catch(error){
        throw error;
    }
};

/**
     * @param {Number} id
     * @param {String} password
     * @returns {Boolean}
     */
module.exports.changePassword = async (id, password) => {
    try{
        const updated = await db.query('UPDATE usuarios set password = $1 WHERE id = $2 ', [password, id]);
        return updated.rowCount == 1;
    } catch(error){
        throw error;
    }
};