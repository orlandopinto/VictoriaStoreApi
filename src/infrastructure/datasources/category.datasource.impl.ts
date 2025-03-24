import { AppLogger } from "../../config/appLogger";
import { CategoriesModel, categoriesSchema } from "../../data/mongodb/models/categories.model";
import { CategoryDatasource } from "../../domain/datasources/category.datasourse";
import { AddCategoryDto } from "../../domain/dtos/categories/add-category.dto";
import { DeleteCategoryDto } from "../../domain/dtos/categories/delete-category.dto";
import { UpdateCategoryDto } from "../../domain/dtos/categories/update.category.dto";
import { CategoryEntity, GetCategoriesEntity } from "../../domain/entities/category.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class CategoryDatasourceImpl implements CategoryDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("CategoryDatasourceImpl");
     }

     async addCategory(addCategoryDto: AddCategoryDto): Promise<CategoryEntity> {

          const { _id, categoryName, categoryDescription, slug, public_id, secure_url } = addCategoryDto;

          try {

               const category = await CategoriesModel.findOne({ categoryName: categoryName })
               if (category) throw CustomError.badRequest('Category already exists.')

               const result = await CategoriesModel.create({ categoryName, categoryDescription, slug, public_id, secure_url })
               await result.save();

               return new CategoryEntity(result._id.toString(), result.categoryName, result.categoryDescription, result.slug, result.public_id, result.secure_url, result.createdAt as unknown as string, result.updatedAt as unknown as string);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
          const { _id, categoryName, categoryDescription, slug, public_id, secure_url } = updateCategoryDto;
          try {
               const result = await CategoriesModel.findByIdAndUpdate(
                    _id,
                    {
                         categoryName: categoryName,
                         categoryDescription: categoryDescription,
                         slug: slug,
                         public_id: public_id,
                         secure_url: secure_url
                    },
                    { new: true });

               if (!result)
                    throw CustomError.notFound('Category not found.');

               return new CategoryEntity(result._id.toString(), result.categoryName, result.categoryDescription, result.slug, result.public_id, result.secure_url, result.createdAt as unknown as string, result.updatedAt as unknown as string);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async deleteCategory(deleteCategoryDto: DeleteCategoryDto): Promise<CategoryEntity> {

          const { _id } = deleteCategoryDto;
          try {
               const category = await CategoriesModel.findOne({ _id: _id })
               if (!category) throw CustomError.badRequest("category does not exist or has been deleted.")

               await CategoriesModel.deleteOne({ _id: _id })

               return new CategoryEntity(_id, category.categoryName, category.categoryDescription, category.slug, category.public_id, category.secure_url, category.createdAt as unknown as string, category.updatedAt as unknown as string);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getCategories(): Promise<GetCategoriesEntity> {
          try {
               const result = await CategoriesModel.find() as unknown as [typeof categoriesSchema][]
               return new GetCategoriesEntity(result);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}