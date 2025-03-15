import { AppLogger } from "../../config/appLogger";
import { PermissionsByRoleModel } from "../../data/mongodb";
import { PagesModel, pagesSchema } from "../../data/mongodb/models/pages.model";
import { PageDatasource } from "../../domain/datasources";
import { AddPageDto, DeletePageDto } from "../../domain/dtos/permissions";
import { AddPageEntity, DeletePageEntity, GetPagesEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class PageDatasourceImpl implements PageDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("PageDatasourceImpl");
     }

     async addPage(addPageDto: AddPageDto): Promise<AddPageEntity> {
          const { pageName } = addPageDto;
          try {
               // 1. Crear el page
               const page = await PagesModel.create({ pageName: pageName })
               await page.save();

               // 2. Mapear la respuesta a la entidad
               return new AddPageEntity(page.id, pageName);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }

     async deletePage(deletePageDto: DeletePageDto): Promise<DeletePageEntity> {
          const { pageName } = deletePageDto;
          try {
               // 1. VERIFICAR SI EXISTE EL pageName
               const exists = await PagesModel.findOne({ pageName: pageName })
               if (!exists) throw CustomError.badRequest("The page name does not exist or has been deleted.")

               // 2. ELIMINAR EL PAGE
               await PagesModel.deleteOne({ pageName: pageName })

               // 3. ELIMINAR TODOS LOS PERMISOS QUE COINCIDAN CON EL pageName
               let permisos = await PermissionsByRoleModel.find({ pageName: pageName })
               if (permisos.length > 0) { //si existen registros se eliminan todos los que coincidan con el roleName
                    await PermissionsByRoleModel.deleteMany({ pageName: pageName });
               }

               // 4. MAPEAR LA RESPUESTA A LA ENTIDAD
               return new DeletePageEntity(pageName);

          } catch (error) {
               this.logger.Error(error as Error)
               throw error;
          }
     }

     async getPages(): Promise<GetPagesEntity> {

          try {

               return new GetPagesEntity([] as [typeof pagesSchema][]);

          } catch (error) {
               this.logger.Error(error as Error)
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }

}