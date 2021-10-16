const supertest = require('supertest');
const app = require ('../../server');
const db = require ('../../database/config');
const api = supertest(app);


const obraSocialTest = {
	nombre: 'Obra Social Test',
	descripcion: 'Obra social de prueba 1'
};

describe('/GET obras sociales',   () => {
	it('should list of obras sociales ', async () => {
		const response =  await api.get('/obras-sociales');
		expect(200);
		expect(Array.isArray(response.body)).toBeTruthy();

	});
    
});

describe('/POST obras sociales',  () => {
	it('should add new obra social in database ', () => {
		api.post('/obras-sociales')
			.send(obraSocialTest)
			.expect(201);
	});
    
});

describe('/POST obras sociales',  () => {
	it('should return 401 status code because nombre is empty and is a required field ', () => {
		const obraSocial2 = {
			descripcion: 'obra social sin nombre'
		};
		api.post('/obras-sociales')
			.send(obraSocial2)
			.expect(401);
	});
    
});