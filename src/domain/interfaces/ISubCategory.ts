import { AddSubCategoryDto } from "../dtos/subcategories/add-sub-category.dto"
import { DeleteSubCategoryDto } from "../dtos/subcategories/delete-sub-category.dto"
import { UpdateSubCategoryDto } from "../dtos/subcategories/update-sub-category.dto"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddSubCategoryUseCase {
     execute(addSubCategoryDto: AddSubCategoryDto): Promise<ApiResultResponse>
}

export interface UpdateSubCategoryUseCase {
     execute(updateSubCategoryDto: UpdateSubCategoryDto): Promise<ApiResultResponse>
}

export interface DeleteSubCategoryUseCase {
     execute(deleteSubCategoryDto: DeleteSubCategoryDto): Promise<ApiResultResponse>
}

export interface GetSubCategoriesUseCase {
     execute(): Promise<ApiResultResponse>
}