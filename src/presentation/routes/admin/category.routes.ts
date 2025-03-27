import { Router } from "express";
import { CategoryDatasourceImpl } from "../../../infrastructure/datasources/category.datasource.impl";
import { CategoryRepositoryImpl } from "../../../infrastructure/repositories/category.repository.impl";
import { CategoryController } from "../../controllers/admin/category.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";

export class CategoryRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new CategoryDatasourceImpl();
          const categoryRepository = new CategoryRepositoryImpl(datasource)
          const controller = new CategoryController(categoryRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addCategory);
          router.put('/', [AuthMiddleware.validateJWT], controller.updateCategory);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteCategory);
          router.get('/', [AuthMiddleware.validateJWT], controller.getCategories);

          return router;
     }
}