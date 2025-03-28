import { Router } from "express";
import { UserDatasourceImpl } from "../../../infrastructure/datasources";
import { UserRepositoryImpl } from "../../../infrastructure";
import { UserController } from "../../controllers/admin/users.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";

export class UserRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new UserDatasourceImpl();
          const userRepository = new UserRepositoryImpl(datasource)
          const controller = new UserController(userRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addUser);
          router.put('/:id', [AuthMiddleware.validateJWT], controller.updateUser);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteUser);
          router.get('/', [AuthMiddleware.validateJWT], controller.getUsers);

          return router;
     }
}
