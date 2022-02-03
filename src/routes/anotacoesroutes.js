import { Router } from 'express';
import anotacoesController from '../controllers/AnotacoesController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', anotacoesController.index);
router.post('/', loginRequired, anotacoesController.store);
router.put('/:id', loginRequired, anotacoesController.update);
router.delete('/:id', loginRequired, anotacoesController.delete);

export default router;
