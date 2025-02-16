import { AddAccessDto, DeleteAccessDto, GetAccessDto } from "../dtos/roles-permissions"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddAccessUseCase {
     execute(addAccessDto: AddAccessDto): Promise<ApiResultResponse>
}

export interface DeleteAccessUseCase {
     execute(deleteAccessDto: DeleteAccessDto): Promise<ApiResultResponse>
}

export interface GetAccessUseCase {
     get(getAccessDto: GetAccessDto): Promise<ApiResultResponse>
}