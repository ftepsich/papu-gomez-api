const db = require('../../database/config');

/**
     * @description Listar Turnos
     * @return {Array<JSON>}
     */
module.exports.fetchAll = async () => {
	const turnos = await db.query('SELECT * from vturnos');
	return turnos.rows;
};


// en esta consulta agregar en el where condicion para traer aquellos turnos con estados asignado
/**
     * @param {Number} id_profesional
     * @return {Array<JSON>}
     */
module.exports.asignadoAProfesional = async (id_profesional) => {
	const turnos = await db.query(
		`SELECT it.fecha_hora_turno, t.duracion
                    FROM turnos t
                    LEFT JOIN informacion_turnos it ON it.id_turno = t.id
                    WHERE t.id_profesional = $1 and it.descripcion = 'Asignado'`,[
			id_profesional
		]);
	return turnos.rows;
        
};



/**
     * @param {Number} id_paciente
     * @param {Number} id_profesional
     * @param {String} practica
     * @param {String} duracion HH:mm
     */
module.exports.create = async (id_paciente, id_profesional, practica, duracion) => {
	const turno = await db.query(`
                INSERT INTO turnos (id_paciente, id_profesional, practica, duracion)
                VALUES ($1,$2,$3,$4)
                RETURNING id`, [
		id_paciente, id_profesional, practica, duracion
	]);
	return turno;
};

/**
     * @param {Number} id_turno
     * @param {String} fecha_hora_turno
     */
module.exports.asignar = async (id_turno, fecha_hora_turno) => {
	const turno = await db.query(`
                INSERT INTO informacion_turnos (id_turno,estado, fecha_hora_turno)
                VALUES ($1,$2,$3)
                RETURNING *`,[
		id_turno, 'Asignado', fecha_hora_turno
	]);
	return turno;
};

