import { PagesModel, pagesSchema } from "../../data/mongodb/models/pages.model";
import { PageDatasource } from "../../domain/datasources";
import { AddPageDto, DeletePageDto } from "../../domain/dtos/permissions";
import { DeletePageEntity, GetPagesEntity, AddPageEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class PageDatasourceImpl implements PageDatasource {

     async addPage(addPageDto: AddPageDto): Promise<AddPageEntity> {
          const { pageName } = addPageDto;
          try {
               // 1. Crear el page
               const page = await PagesModel.create({ pageName: pageName })
               await page.save();

               // 2. Mapear la respuesta a la entidad
               return new AddPageEntity(page.id, pageName);

          } catch (error) {
               throw error;
          }
     }

     async deletePage(deletePageDto: DeletePageDto): Promise<DeletePageEntity> {
          const { pageName } = deletePageDto;
          try {
               const exists = await PagesModel.findOne({ pageName: pageName })
               if (!exists) throw CustomError.badRequest("The page name does not exist or has been deleted.")

               // 2. eliminar el page
               const result = await PagesModel.deleteOne({ pageName: pageName })

               // 3. Mapear la respuesta a la entidad
               return new DeletePageEntity(pageName);

          } catch (error) {
               throw error;
          }
     }

     async getPages(): Promise<GetPagesEntity> {
          try {

               const pages = await PagesModel.find() as unknown as [typeof pagesSchema][]

               return new GetPagesEntity(pages);

          } catch (error) {
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }

}