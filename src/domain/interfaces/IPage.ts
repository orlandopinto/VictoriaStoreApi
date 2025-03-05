import { AddPageDto, DeletePageDto, GetPagesDto } from "../dtos/permissions/index"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddPageUseCase {
     execute(addPageDto: AddPageDto): Promise<ApiResultResponse>
}

export interface DeletePageUseCase {
     execute(deletePageDto: DeletePageDto): Promise<ApiResultResponse>
}

export interface GetPagesUseCase {
     execute(getActionsDto: GetPagesDto): Promise<ApiResultResponse>
}