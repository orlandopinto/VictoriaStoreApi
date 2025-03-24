import { AddSubCategoryDto } from "../dtos/subcategories/add-sub-category.dto";
import { DeleteSubCategoryDto } from "../dtos/subcategories/delete-sub-category.dto";
import { UpdateSubCategoryDto } from "../dtos/subcategories/update-sub-category.dto";
import { GetSubCategoriesEntity, SubCategoryEntity } from "../entities/sub-category.entity";

export abstract class SubCategoryRepository {

     abstract addSubCategory(addSubCategoryDto: AddSubCategoryDto): Promise<SubCategoryEntity>
     abstract updateSubCategory(updateSubCategoryDto: UpdateSubCategoryDto): Promise<SubCategoryEntity>
     abstract deleteSubCategory(deleteSubCategoryDto: DeleteSubCategoryDto): Promise<SubCategoryEntity>
     abstract getSubCategories(): Promise<GetSubCategoriesEntity>

}