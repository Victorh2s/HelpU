import Sequelize, { Model } from 'sequelize';

export default class Anotacoes extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [1, 15],
              msg: 'O nome de suas anotações precisam ter entre 1 e 15 caracteres',
            },
          },
        },
        notas: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [1, 450],
              msg: 'Suas anotações precisam ter entre 1 e 450 caracteres',
            },
          },
        },
      },
      {
        sequelize,
      },

    );
    return this;
  }
}
