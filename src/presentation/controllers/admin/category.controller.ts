import { AppLogger } from "../../../config/appLogger";
import { AddCategoryDto } from "../../../domain/dtos/categories/add-category.dto";
import { DeleteCategoryDto } from "../../../domain/dtos/categories/delete-category.dto";
import { UpdateCategoryDto } from "../../../domain/dtos/categories/update.category.dto";
import { CategoryRepository } from "../../../domain/repositories/category.repository";
import { ApiResultResponse } from "../../../domain/types";
import { AddCategory } from "../../../domain/usecases/categories/add-category.usecase";
import { DeleteCategory } from "../../../domain/usecases/categories/delete-category.usecase";
import { GetCategories } from "../../../domain/usecases/categories/get-categories.usecase";
import { UpdateCategory } from "../../../domain/usecases/categories/update-category.usecase";

export class CategoryController {

     logger: AppLogger;

     constructor(private readonly categoryRepository: CategoryRepository) {
          this.logger = new AppLogger("CategoryController");
     }

     addCategory = async (req: any, res: any) => {
          const [error, addCategoryDto] = AddCategoryDto.create(req.body);
          if (error) return this.handleError(error, res);

          await new AddCategory(this.categoryRepository)
               .execute(addCategoryDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleError(error, res));
     }

     updateCategory = async (req: any, res: any) => {
          const [error, updateCategoryDto] = UpdateCategoryDto.update(req.body);
          if (error) return this.handleError(error, res);

          new UpdateCategory(this.categoryRepository)
               .execute(updateCategoryDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleError(error, res));
     }

     deleteCategory = (req: any, res: any) => {
          try {
               const [error, deleteCategoryDto] = DeleteCategoryDto.delete(req.body);
               if (error) return this.handleError(error, res);

               new DeleteCategory(this.categoryRepository)
                    .execute(deleteCategoryDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.logger.Error(error as Error);
          }
     }

     getCategories = async (req: any, res: any) => {
          try {
               const data = await new GetCategories(this.categoryRepository).execute();
               return res.json({ ...data, data: data.data.categories });
          } catch (error) {
               this.handleError(error as string, res);
          }
     }

     handleError = (error: string, res: any) => {
          if (error) {
               const responseError: ApiResultResponse = {
                    hasError: true,
                    message: error as string,
                    stackTrace: null,
                    status: "error",
                    statusCode: 400,
                    data: null
               }
               return res.status(400).json(responseError)
          }
     }

}