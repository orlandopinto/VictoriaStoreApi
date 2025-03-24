import { AddCategoryDto } from "../dtos/categories/add-category.dto"
import { DeleteCategoryDto } from "../dtos/categories/delete-category.dto"
import { UpdateCategoryDto } from "../dtos/categories/update.category.dto"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddCategoryUseCase {
     execute(addCategoryDto: AddCategoryDto): Promise<ApiResultResponse>
}

export interface UpdateCategoryUseCase {
     execute(updateCategoryDto: UpdateCategoryDto): Promise<ApiResultResponse>
}

export interface DeleteCategoryUseCase {
     execute(deleteCategoryDto: DeleteCategoryDto): Promise<ApiResultResponse>
}

export interface GetCategoriesUseCase {
     execute(): Promise<ApiResultResponse>
}