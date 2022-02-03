import { Router } from 'express';
import FotoController from '../controllers/FotoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, FotoController.store);

export default router;

/*
index  lista todos os usuarios /GET
store cria um novo usuario /POST
delete apaga um usuario /DELETE
show mostra um usuario /GET
update atualiza um usuario /PATCH OU PUT
*/
