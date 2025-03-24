import { SubCategoryDatasource } from "../../domain/datasources";
import { AddSubCategoryDto } from "../../domain/dtos/subcategories/add-sub-category.dto";
import { DeleteSubCategoryDto } from "../../domain/dtos/subcategories/delete-sub-category.dto";
import { UpdateSubCategoryDto } from "../../domain/dtos/subcategories/update-sub-category.dto";
import { GetSubCategoriesEntity, SubCategoryEntity } from "../../domain/entities";
import { SubCategoryRepository } from "../../domain/repositories/sub-category.repository";

export class SubCategoryRepositoryImpl implements SubCategoryRepository {

     constructor(private readonly subCategoryDatasource: SubCategoryDatasource) { }

     addSubCategory(addSubCategoryDto: AddSubCategoryDto): Promise<SubCategoryEntity> {
          return this.subCategoryDatasource.addSubCategory(addSubCategoryDto);
     }

     updateSubCategory(updateSubCategoryDto: UpdateSubCategoryDto): Promise<SubCategoryEntity> {
          return this.subCategoryDatasource.updateSubCategory(updateSubCategoryDto);
     }

     deleteSubCategory(deleteSubCategoryDto: DeleteSubCategoryDto): Promise<SubCategoryEntity> {
          return this.subCategoryDatasource.deleteSubCategory(deleteSubCategoryDto);
     }

     getSubCategories(): Promise<GetSubCategoriesEntity> {
          return this.subCategoryDatasource.getSubCategories();
     }

}