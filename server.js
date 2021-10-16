const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const corsOptions = {origin: process.env.URL || '*'};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('./components/authentication/authentication.routes'));
app.use(require('./components/rol/rol.routes'));
app.use(require('./components/usuario/usuario.routes'));
app.use(require('./components/paciente/paciente.routes'));
app.use(require('./components/profesional/profesional.route'));

app.use(require('./components/obra-social/obra-social.routes'));
app.use(require('./components/turno/turno.routes'));


if (process.env.NODE_ENV !== 'test') {
	app.listen(process.env.PORT || 4000, (err)=> {
		if(err){
			console.log(err);
			process.exit(1);
		}});
}

console.log(`Server running in ${process.env.PORT}`);

module.exports = app;
