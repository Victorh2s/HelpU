import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Galeria extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [1, 25],
              msg: 'O titulo precisa entre 1 e 25 caracteres',
            },
          },
        },
        originalname: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vázio',
            },
          },
        },

        filename: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vázio',
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${appConfig.url}/imagens/${this.getDataValue('filename')}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'galeria',
      },

    );
    return this;
  }
}
