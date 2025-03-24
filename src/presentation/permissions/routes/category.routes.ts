import { Router } from "express";
import { CategoryDatasourceImpl } from "../../../infrastructure/datasources/category.datasource.impl";
import { CategoryRepositoryImpl } from "../../../infrastructure/repositories/category.repository.impl";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { CategoryController } from "../controllers/category.controller";

export class CategoryRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new CategoryDatasourceImpl();
          const actionRepository = new CategoryRepositoryImpl(datasource)
          const controller = new CategoryController(actionRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addCategory);
          router.put('/', [AuthMiddleware.validateJWT], controller.updateCategory);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteCategory);
          router.get('/', [AuthMiddleware.validateJWT], controller.getCategories);

          return router;
     }
}