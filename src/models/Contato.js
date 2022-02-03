import Sequelize, { Model } from 'sequelize';

export default class Contato extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 15],
              msg: 'Nome precisa ter entre 3 e 15 caracteres',
            },
          },
        },

        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'E-mail já existe',
          },
          validate: {
            isEmail: {
              msg: 'E-mail inválido',
            },
          },
        },
        telefone: {
          type: Sequelize.INTEGER,
          defaultValue: '',
          validate: {
            len: {
              args: [8, 10],
              msg: 'Telefone precisa ter entre 8 e 10 números',
            },
            isNumeric: {
              msg: 'Coloque apenas números',
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

  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'contato_id' });
  }
}
