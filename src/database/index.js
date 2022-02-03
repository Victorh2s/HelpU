import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Users from '../models/Users';
import Contato from '../models/Contato';
import Foto from '../models/Foto';

const models = [Users, Contato, Foto];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
