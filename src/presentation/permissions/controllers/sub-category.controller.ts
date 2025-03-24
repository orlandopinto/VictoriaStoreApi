import { AppLogger } from "../../../config/appLogger";
import { AddSubCategoryDto } from "../../../domain/dtos/subcategories/add-sub-category.dto";
import { DeleteSubCategoryDto } from "../../../domain/dtos/subcategories/delete-sub-category.dto";
import { GetSubCategoriesDto } from "../../../domain/dtos/subcategories/get-sub-categories.dto";
import { UpdateSubCategoryDto } from "../../../domain/dtos/subcategories/update-sub-category.dto";
import { SubCategoryRepository } from "../../../domain/repositories/sub-category.repository";
import { ApiResultResponse } from "../../../domain/types";
import { AddSubCategory } from "../../../domain/usecases/subCategories/add-sub-category.usecase";
import { DeleteSubCategory } from "../../../domain/usecases/subCategories/delete-sub-category.usecase";
import { GetSubCategories } from "../../../domain/usecases/subCategories/get-sub-categories.usecase";
import { UpdateSubCategory } from "../../../domain/usecases/subCategories/update-sub-category.usecase";

export class SubCategoryController {

     logger: AppLogger;

     constructor(private readonly subCategoryRepository: SubCategoryRepository) {
          this.logger = new AppLogger("SubCategoryController");
     }

     addSubCategory = async (req: any, res: any) => {
          const [error, addSubCategoryDto] = AddSubCategoryDto.create(req.body);
          if (error) return this.handleError(error, res);

          new AddSubCategory(this.subCategoryRepository)
               .execute(addSubCategoryDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleError(error, res));
     }

     updateSubCategory = (req: any, res: any) => {
          const [error, updateUserDto] = UpdateSubCategoryDto.update(req.body);
          if (error) return this.handleError(error, res);

          new UpdateSubCategory(this.subCategoryRepository)
               .execute(updateUserDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleError(error, res));
     }

     deleteSubCategory = (req: any, res: any) => {
          try {
               const [error, deleteSubCategoryDto] = DeleteSubCategoryDto.delete(req.body);
               if (error) return this.handleError(error, res);

               new DeleteSubCategory(this.subCategoryRepository)
                    .execute(deleteSubCategoryDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.logger.Error(error as Error);
          }
     }

     getSubCategories = (req: any, res: any) => {
          try {
               const [error] = GetSubCategoriesDto.get(req.body);
               if (error) return this.handleError(error, res);

               new GetSubCategories(this.subCategoryRepository)
                    .execute()
                    .then((data) => {
                         //NOTE: Asignar objeto.data para que lo devuelva a la api como data
                         data.data = data.data.subCategories
                         return res.json(data)
                    })
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.logger.Error(error as Error);
          }
     }

     handleError = (error: string, res: any) => {
          if (error) {
               const responsError: ApiResultResponse = {
                    hasError: true,
                    message: error as string,
                    stackTrace: null,
                    status: "error",
                    statusCode: 400,
                    data: null
               }
               return res.status(400).json(responsError)
          }
     }

}