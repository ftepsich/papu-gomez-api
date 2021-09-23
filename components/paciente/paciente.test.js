const supertest = require('supertest');
const app = require ('../../server');
const db = require ('../../database/config');
const api = supertest(app);

const pacienteTest = {
    nombre: 'Jose',
    apellido: 'Gonzalez',
    fecha_nacimiento: '1980-07-01',
    direccion: { 
        calle: 'San martin',
        numero: '9569',
        piso: '',
        departamento: ''
    },
    dni: 30558693,
    id_usuario: 18

};

describe('/POST pacientes', () => {
    it('should insert pacientes into database ', async () => {
        api.post('/pacientes')
            .send(pacienteTest)
            .expect(201);

});
});
