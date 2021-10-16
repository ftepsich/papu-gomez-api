exports.seed = (knex, Promise) => {
	// Deletes ALL existing entries
	return knex('informacion_turnos').del()
		.then(() => {
			// Inserts seed entries
			return knex('informacion_turnos').insert([
				{
					id_turno: 1,
					estado: 'Cancelado',
					fecha_hora_turno: '2020-02-10 16:30:00',
				},
				{
					id_turno: 2,
					estado: 'Asignado',
					fecha_hora_turno: '2020-02-11 11:00:00',
				},

				{
					id_turno: 3,
					estado: 'Asignado',
					fecha_hora_turno: '2020-02-12 11:30:00',
				},

				{
					id_turno: 4,
					estado: 'Asignado',
					fecha_hora_turno: '2020-02-14 09:30:00',
				},

				{
					id_turno: 6,
					estado: 'Asignado',
					fecha_hora_turno: '2020-02-16 18:20:00',
				},

				{
					id_turno: 7,
					estado: 'Asignado',
					fecha_hora_turno: '2020-02-18 19:00:00',
				},
				{
					id_turno: 8,
					estado:'Asignado',
					fecha_hora_turno: '2020-02-19 18:40:00',
				},

				{
					id_turno: 9,
					estado:'Asignado',
					fecha_hora_turno: '2020-02-26 11:48:00',
				},
				{
					id_turno: 10,
					estado: 'Cancelado',
					fecha_hora_turno: '2020-02-26 18:10:00',
				},
			]);
		});
};