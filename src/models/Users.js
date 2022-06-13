import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 25],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 25],
            msg: 'Campo sobrenome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existe',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 25],
            msg: 'A senha precisa ter entre 6 e 25 caracteres',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

    passwordIsValid(password) {
      return bcryptjs.compare(password, this.password_hash);
    }

  static associate(models) {
    this.hasMany(
      models.Contato,
      { foreignKey: 'user_id' },
    );
    Contato.belongsTo(User,{
      foreignKey: 'user_id'
    })

    this.hasMany(models.Anotacoes, { foreignKey: 'use_id' });
    Anotacoes.belongsTo(User,{
      foreignKey: 'use_id'
    })

    this.hasMany(models.Galeria, { foreignKey: 'userr_id' });
    Galeria.belongsTo(User, {
      foreignKey: 'userr_id'
    })
  }
}
