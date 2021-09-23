const db = require('../../database/config');

/**
     * @description Listar Pacientes
     * @param {Number} limit
     * @param {Number} offset
     * @returns {Array<JSON>}
     */
module.exports.fetchAll = async (limit, offset)  => {
    const paciente = await db.query('SELECT id, nombre, apellido, documento, telefono FROM pacientes ORDER BY apellido ASC LIMIT $1 OFFSET $2', [limit, offset]);
    return paciente.rows;
};

/**
     * @description Listar Paciente por id
     * @param {Number} id
     * @returns {JSON}
     */
module.exports.fetchById = async (id) => {
    const paciente = await db.query('SELECT p.nombre,p.apellido,p.fecha_nacimiento,p.telefono,p.direccion,p.documento,os.Descripcion,osp.numero_afiliado as "Numero afiliado" FROM pacientes p JOIN obras_sociales_pacientes osp ON p.id = osp.id_paciente JOIN obras_sociales os ON os.Id = osp.id_obra_social WHERE p.id = $1', [id]);
    return paciente.rows[0];
    
};

/**
     * @description Crear Pacientes
     * @param {String} nombre
     * @param {String} apellido
     * @param {Date} fecha_nacimiento
     * @param {JSON} documento
     * @param {String} telefono
     * @param {JSON} direccion
     * @param {Number} id_usuario
     * @returns {Number}
     */
module.exports.insert = async (nombre, apellido, fecha_nacimiento, documento, telefono, direccion, id_usuario)  => {
    try {
        await db.query('BEGIN');
        const newPaciente = await db.query(`
                INSERT INTO pacientes 
                    (nombre, apellido, fecha_nacimiento, documento, telefono, direccion, id_usuario) 
                VALUES 
                    ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *`,
        [nombre, apellido, fecha_nacimiento, documento, telefono, direccion, id_usuario]
        );
        await db.query('COMMIT');
        const id_paciente = newPaciente.rows[0].id;
        return id_paciente;
    } catch (error) {
        await db.query('ROLLBACK');
        throw error;
    }
};

module.exports.update = async (nombre, apellido, fecha_nacimiento, documento, telefono, direccion, id) => {
    try {
        await db.query('BEGIN');
        const paciente = await db.query('UPDATE pacientes set nombre = $1,apellido = $2, fecha_nacimiento = $3, documento = $4,telefono = $5, direccion = $6 WHERE id = $7',
            [
                nombre,
                apellido,
                fecha_nacimiento,
                documento,
                telefono,
                direccion,
                id
            ]
        );
        await db.query('COMMIT');
        return paciente;
    } catch (error) {
        await db.query('ROLLBACK');
        throw error;
    }
};

/**
     * @description Eliminar Paciente
     * @param {Number} id
     * @returns {Boolean}
     */
module.exports.deletePaciente = async (id) =>  {
    try {
        await db.query('BEGIN');
        const removedPaciente = await db.query('DELETE FROM pacientes where ID = $1', [id]);
        await db.query('COMMIT');
        return removedPaciente.rowCount > 0;
    } catch (error) {
        await db.query('ROLLBACK');
        throw error;
    }
};

/**
     * @description Crea la asociación entre la Obra Social y el Paciente
     * @param {Number} id_obra_social
     * @param {Number} id_paciente,
     * @param {String} numero_afiliado
     * @param {Enum} iva
     * @param {Boolean} afiliado
     * @returns {Boolean}
     */
module.exports.insertObraSocialPaciente = async (id_obra_social, id_paciente, numero_afiliado, afiliado, modalidad_iva) => {
    try {
        await db.query('BEGIN');
        const newObraSocialPaciente = await db.query(`
                INSERT INTO obras_sociales_pacientes 
                    (id_obra_social, id_paciente, numero_afiliado, afiliado,modalidad_iva,activo)
                VALUES 
                    ($1, $2, $3, $4, $5, $6)
                RETURNING *`,
        [id_obra_social, id_paciente, numero_afiliado,afiliado, modalidad_iva, true]
        );
        await db.query('COMMIT');
        return newObraSocialPaciente.rowCount > 0;
    } catch (error) {
        await db.query('ROLLBACK');
        throw error;
    }
};
module.exports.updateObraSocialPaciente = async (numero_afiliado, id) => {
    try {
        await db.query('BEGIN');
        const obraSocialPaciente = await db.query('UPDATE obras_sociales_pacientes SET numero_afiliado = $1 WHERE ID = $2 ', [numero_afiliado, id]);
        await db.query('COMMIT');
        return obraSocialPaciente.rowCount == 1;
    } catch (error) {
        await db.query('ROLLBACK');
        throw error;
    }
};