import multer from 'multer';
import Galeria from '../models/Galeria';
import multerConfig from '../config/multerConfig';

const upload = multer(multerConfig).single('galeria');

class GaleriaController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          error: [error.code],
        });
      }
      try {
        const { originalname, filename } = req.file;
        const { userr_id, title } = req.body;
        const foto = await Galeria.create({
          originalname, filename, userr_id, title,
        });
        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }
    });
  }

  async delete(req, res) {
    try {
      const foto = await Galeria.findByPk(req.params.id);
      if (!foto) {
        return res.status(400).json({
          errors: ['Esta imagem não existe'],
        });
      }

      await foto.destroy();
      return res.json('Imagem apagada com sucesso');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const imagens = await Galeria.findAll({
        attributes: ['id', 'title', 'originalname', 'filename', 'url'],
      });

      return res.json(imagens);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
export default new GaleriaController();
