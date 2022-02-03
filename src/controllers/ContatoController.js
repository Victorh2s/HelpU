import Contato from '../models/Contato';
import Foto from '../models/Foto';

class ContatoController {
  async index(req, res) {
    const contatos = await Contato.findAll({
      attributes: ['id', 'nome', 'email', 'telefone'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['id', 'filename', 'originalname', 'url'],
      },
    });
    return res.json(contatos);
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando Id'],
        });
      }
      const contato = await Contato.findByPk(id, {
        attributes: ['id', 'nome', 'email', 'telefone'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['id', 'filename', 'originalname', 'url'],
        },
      });

      if (!contato) {
        return res.status(400).json({
          errors: ['contato não existe'],
        });
      }
      return res.json(contato) && res.header('Access-Control-Allow-Origin', '*');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const contato = await Contato.create(req.body);

      return res.json(contato);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Coloque o id'],
        });
      }

      const contato = await Contato.findByPk(id);

      if (!contato) {
        return res.status(400).json({
          errors: ['Contato não existe'],
        });
      }
      await contato.destroy();

      return res.json('Contato apagado');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Coloque o id do contato'],
        });
      }

      const contato = await Contato.findByPk(id);
      if (!contato) {
        return res.status(400).json({
          errors: ['Este contato não existe'],
        });
      }
      const novoContato = await contato.update(req.body);
      return res.json(novoContato);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ContatoController();
