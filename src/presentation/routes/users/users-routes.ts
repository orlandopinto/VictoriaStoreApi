import { Router } from "express";
import { UserRepositoryImpl } from '../../../infrastructure/repositories';
import { UserDatasourceImpl } from "../../../infrastructure/datasources";
import { UsersController } from "../../controllers/users/users.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";

export class UsersRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new UserDatasourceImpl();
          const authRepository = new UserRepositoryImpl(datasource)
          const controller = new UsersController(authRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addUser);
          router.put('/:id', [AuthMiddleware.validateJWT], controller.updateUser);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteUser)
          router.get('/', [AuthMiddleware.validateJWT], controller.getUsers)

          return router;
     }
}