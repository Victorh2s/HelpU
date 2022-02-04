import { Router } from 'express';
import contatoController from '../controllers/ContatoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', contatoController.index);
router.get('/:id', contatoController.show);

router.post('/', loginRequired, contatoController.store);
router.put('/:id', loginRequired, contatoController.update);
router.delete('/:id', loginRequired, contatoController.delete);

export default router;
