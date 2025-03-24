import { AppLogger } from "../../config/appLogger";
import { SubCategoriesModel, subCategoriesSchema } from "../../data/mongodb/models/sub-categories.model";
import { SubCategoryDatasource } from "../../domain/datasources";
import { AddSubCategoryDto } from "../../domain/dtos/subcategories/add-sub-category.dto";
import { DeleteSubCategoryDto } from "../../domain/dtos/subcategories/delete-sub-category.dto";
import { UpdateSubCategoryDto } from "../../domain/dtos/subcategories/update-sub-category.dto";
import { GetSubCategoriesEntity, SubCategoryEntity } from "../../domain/entities/sub-category.entity";

import { CustomError } from "../../domain/errors/custom.error";

export class SubCategoryDatasourceImpl implements SubCategoryDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("SubCategoryDatasourceImpl");
     }

     async addSubCategory(addSubCategoryDto: AddSubCategoryDto): Promise<SubCategoryEntity> {

          let { _id, subCategoryName, slug, CategoryId, subCategoryDescription } = addSubCategoryDto;

          try {

               const subCategory = await SubCategoriesModel.findOne({ subCategoryName: subCategoryName })
               if (subCategory) throw CustomError.badRequest('Sub category already exists.')
               const result = await SubCategoriesModel.create({ subCategoryName, slug, CategoryId, subCategoryDescription })
               await result.save();

               return new SubCategoryEntity(_id, result.subCategoryName, result.slug, result.CategoryId.toString(), result.subCategoryDescription, result.createdAt as unknown as string, result.updatedAt as unknown as string);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async updateSubCategory(updateSubCategoryDto: UpdateSubCategoryDto): Promise<SubCategoryEntity> {

          const { _id, subCategoryName, slug, CategoryId, subCategoryDescription } = updateSubCategoryDto;
          try {
               const subCategory = await SubCategoriesModel.findByIdAndUpdate(_id, { subCategoryName, slug, CategoryId, subCategoryDescription }, { new: true });

               if (!subCategory) {
                    throw CustomError.notFound('Sub category not found.');
               }

               return new SubCategoryEntity(_id, subCategory.subCategoryName, subCategory.slug, subCategory.CategoryId.toString(), subCategory.subCategoryDescription, subCategory.createdAt as unknown as string, subCategory.updatedAt as unknown as string);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async deleteSubCategory(deleteSubCategoryDto: DeleteSubCategoryDto): Promise<SubCategoryEntity> {

          const { _id } = deleteSubCategoryDto;

          try {

               const subCategory = await SubCategoriesModel.findOne({ _id: _id })
               if (!subCategory) throw CustomError.badRequest("Sub category does not exist or has been deleted.")
               await SubCategoriesModel.deleteOne({ _id: _id });
               return new SubCategoryEntity(_id, subCategory.subCategoryName, subCategory.slug, subCategory.CategoryId.toString(), subCategory.subCategoryDescription, subCategory.createdAt as unknown as string, subCategory.updatedAt as unknown as string);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getSubCategories(): Promise<GetSubCategoriesEntity> {

          try {

               const result = await SubCategoriesModel.find() as unknown as [typeof subCategoriesSchema][]
               return new GetSubCategoriesEntity(result);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}