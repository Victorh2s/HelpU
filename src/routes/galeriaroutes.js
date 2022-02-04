import { Router } from 'express';
import galeriaController from '../controllers/GaleriaController';
import LoginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', galeriaController.index);
router.post('/', LoginRequired, galeriaController.store);
router.delete('/:id', LoginRequired, galeriaController.delete);

export default router;
