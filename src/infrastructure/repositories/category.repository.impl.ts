import { CategoryDatasource } from "../../domain/datasources/category.datasourse";
import { AddCategoryDto } from "../../domain/dtos/categories/add-category.dto";
import { DeleteCategoryDto } from "../../domain/dtos/categories/delete-category.dto";
import { UpdateCategoryDto } from "../../domain/dtos/categories/update.category.dto";
import { CategoryEntity, GetCategoriesEntity } from "../../domain/entities";
import { CategoryRepository } from "../../domain/repositories/category.repository";

export class CategoryRepositoryImpl implements CategoryRepository {

     constructor(private readonly categoryDatasource: CategoryDatasource) { }

     addCategory(addCategoryDto: AddCategoryDto): Promise<CategoryEntity> {
          return this.categoryDatasource.addCategory(addCategoryDto);
     }

     updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
          return this.categoryDatasource.updateCategory(updateCategoryDto);
     }

     deleteCategory(deleteCategoryDto: DeleteCategoryDto): Promise<CategoryEntity> {
          return this.categoryDatasource.deleteCategory(deleteCategoryDto);
     }

     getCategories(): Promise<GetCategoriesEntity> {
          return this.categoryDatasource.getCategories();
     }

}