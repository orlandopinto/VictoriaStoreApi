import { AddCategoryDto } from "../dtos/categories/add-category.dto";
import { DeleteCategoryDto } from "../dtos/categories/delete-category.dto";
import { UpdateCategoryDto } from "../dtos/categories/update.category.dto";
import { CategoryEntity, GetCategoriesEntity } from "../entities/category.entity";

export abstract class CategoryRepository {

     abstract addCategory(addCategoryDto: AddCategoryDto): Promise<CategoryEntity>
     abstract updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity>
     abstract deleteCategory(deleteCategoryDto: DeleteCategoryDto): Promise<CategoryEntity>
     abstract getCategories(): Promise<GetCategoriesEntity>

}