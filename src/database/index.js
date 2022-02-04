import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Users from '../models/Users';
import Contato from '../models/Contato';
import Foto from '../models/Foto';
import Anotacoes from '../models/Anotacoes';
import Galeria from '../models/Galeria';

const models = [Users, Contato, Foto, Anotacoes, Galeria];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
