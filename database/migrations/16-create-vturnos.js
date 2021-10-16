exports.up = async (knex) => {
	await knex.raw(`CREATE OR REPLACE VIEW vturnos as select t.id as id_turno, 
    t.id_paciente, CONCAT(p.nombre,' ',p.apellido) as paciente, it.fecha_hora_turno,t.practica 
    FROM turnos t JOIN pacientes p ON p.id = t.id_paciente JOIN informacion_turnos it ON t.id = it.id_turno 
    WHERE it.estado = 'Asignado';`);
};

exports.down = async (knex) => {
	await knex.raw(`CREATE OR REPLACE VIEW vturnos as select t.id as id_turno, 
    t.id_paciente, CONCAT(p.nombre,' ',p.apellido) as paciente, it.fecha_hora_turno,t.practica 
    FROM turnos t JOIN pacientes p ON p.id = t.id_paciente JOIN informacion_turnos it ON t.id = it.id_turno 
    WHERE it.estado = 'Asignado';`);
};