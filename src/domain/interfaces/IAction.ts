import { AddActionDto, DeleteActionDto } from "../dtos/permissions/index"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddActionUseCase {
     execute(addActionDto: AddActionDto): Promise<ApiResultResponse>
}

export interface DeleteActionUseCase {
     execute(deleteActionDto: DeleteActionDto): Promise<ApiResultResponse>
}

export interface GetActionsUseCase {
     execute(): Promise<ApiResultResponse>
}