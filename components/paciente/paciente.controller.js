const db = require('./paciente.sql.js');
const bcrypt = require('bcryptjs');
const { capitalize } = require('../../utils/tools');
const usuarioSql = require ('../usuario/usuario.sql');
const createError = require('http-errors');
const pacienteController = {};

/**
     * @description Listar Pacientes
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
pacienteController.getPaciente = async (req, res, next) => {
	try {
		const limit = req.body['limit'] || 10;
		const offset = req.body['offset'] || 0;
		const pacientes = await  db.fetchAll(limit, offset);
		return res.status(200).json(pacientes);
	} catch (error) {
		next(createError(error, 'No se pudieron listar los pacientes'));
	}
};

/**
     * @description Listar paciente por id
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
pacienteController.getPacienteById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const paciente = await db.fetchById(id);
		return res.status(200).json(paciente);
        
	} catch (error) {
		next(createError(error, 'No se pudo encontrar el paciente'));
	}
};

/**
     * @description Agregar Paciente
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
pacienteController.createPaciente = async (req, res, next) => {
	try {
		const {
			fecha_nacimiento,
			telefono,
			direccion,
			documento,
			email,
			id_obra_social,
			numero_afiliado,
			afiliado,
			modalidad_iva
		} = req.body;
		const nombre = capitalize(req.body.nombre);
		const apellido = capitalize(req.body.apellido);
		const nroDocumento = documento.toString();
		const username = `${apellido.toLowerCase()} ${nombre.toLowerCase()}`.replace(' ', '_');
		const password = bcrypt.hashSync(nroDocumento, 10);
		const id_usuario = await usuarioSql.insertUsuario(username, password, email, 3);
		if(typeof id_usuario !== 'number') throw ('No se pudo crear el usuario');
		const id_paciente = await db.insert(nombre, apellido, fecha_nacimiento, documento, telefono, direccion, id_usuario);
		if(typeof id_paciente !== 'number') throw ('No se pudo crear un nuevo paciente');

		if(id_obra_social > 0){
			await db.insertObraSocialPaciente(id_obra_social, id_paciente, numero_afiliado, afiliado, modalidad_iva);
		}
		return res.status(201).json({id_paciente});
       
	} catch (error) {
		next(createError(error, 'No se pudo crear un nuevo paciente'));
	}
};

/**
     * @description Actualizar Paciente
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     * @todo Migrar consultas SQL a paciente.sql
     */
pacienteController.updatePaciente = async (req, res, next) => {
	try {
		const id = req.params.id;
		const id_obra_social_paciente = req.params.id_obra_social_paciente;

		const { 
			nombre,
			apellido,
			fecha_nacimiento,
			documento,
			telefono,
			direccion,
			numero_afiliado,
		} = req.body;
		const updatePaciente = await db.update(nombre,apellido,fecha_nacimiento,documento,telefono,direccion,id);
		await db.updateObraSocialPaciente(numero_afiliado,id_obra_social_paciente);
		return res.status(201).json({updatePaciente});
	} catch (error) {
		next(createError(error, 'No se pudo actualizar el paciente'));
	}
};

/**
     * @description Eliminar Paciente
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     */
pacienteController.deletePaciente = async (req, res, next) => {
	try {
		const id = req.params.id;
		await db.deletePaciente(id);
		return res.status(200).send(`Se eliminó el paciente con el ID: ${id}`);

	} catch (error) {
		next(createError(error, 'No se pudo eliminar el paciente'));
	}
};

module.exports = pacienteController;