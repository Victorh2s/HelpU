// import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    res.json('ola homecontroller');
  }
}

export default new HomeController();
