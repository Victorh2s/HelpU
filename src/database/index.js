import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Users from '../models/Users';

const models = [Users];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
