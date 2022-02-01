import { Router } from 'express';
import usersController from '../controllers/UsersController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', usersController.index);
// router.get('/:id', usersController.show);

router.post('/', usersController.store);
router.put('/:id', loginRequired, usersController.update);
router.delete('/:id', loginRequired, usersController.delete);

export default router;

/*
index  lista todos os usuarios /GET
store cria um novo usuario /POST
delete apaga um usuario /DELETE
show mostra um usuario /GET
update atualiza um usuario /PATCH OU PUT
*/
