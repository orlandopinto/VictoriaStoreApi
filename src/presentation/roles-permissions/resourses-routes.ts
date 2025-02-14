import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware";
import { ResourseController } from "./resourses.controller";
import { ResoursesRepositoryImpl } from "../../infrastructure";
import { ResourseDatasourceImpl } from "../../infrastructure/datasources";

export class ResoursesRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new ResourseDatasourceImpl();
          const resourseRepository = new ResoursesRepositoryImpl(datasource)
          const controller = new ResourseController(resourseRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addResourse);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteResourse);
          router.get('/', [AuthMiddleware.validateJWT], controller.getResourses);

          return router;
     }
}