import User from '../models/Users';
import Contato from '../models/Contato';
import Anotacoes from '../models/Anotacoes';
import Galeria from '../models/Galeria';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const {
        id, nome, sobrenome, email,
      } = novoUser;
      return res.json({
        id, nome, sobrenome, email,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    const user = await User.findAll({
      attributes: ['id', 'nome', 'email', 'sobrenome'],
      order: [['id', 'DESC'], [Contato, 'id', 'DESC'], [Anotacoes, 'id', 'DESC'], [Galeria, 'id', 'DESC']],
      include: [{
        model: Contato,
      }, {
        model: Anotacoes,
      }, {
        model: Galeria,
      },
      ],
    });
    return res.json(user);
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      await user.destroy();
      return res.json('Usuário apagado com sucesso');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
