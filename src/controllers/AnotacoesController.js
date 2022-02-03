import Anotacoes from '../models/Anotacoes';

class AnotacoesController {
  async index(req, res) {
    const motrarNota = await Anotacoes.findAll({
      attributes: ['id', 'nome', 'notas'],
    });
    return res.json(motrarNota);
  }

  async store(req, res) {
    try {
      const novaNota = await Anotacoes.create(req.body);
      return res.json(novaNota);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const anotacao = await Anotacoes.findByPk(req.params.id);

      if (!anotacao) {
        return res.status(400).json({
          errors: ['Anotação não existe'],
        });
      }

      const attAnotacao = await anotacao.update(req.body);
      const { id, nome, notas } = attAnotacao;
      return res.json({ id, nome, notas });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const anotacao = await Anotacoes.findByPk(req.params.id);

      if (!anotacao) {
        return res.status(400).json({
          errors: ['Anotação não existe'],
        });
      }

      await anotacao.destroy();

      return res.json('Anotação excluida com sucesso.');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AnotacoesController();
