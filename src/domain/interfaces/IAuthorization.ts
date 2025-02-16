import { AddAuthorizationDto, DeleteAuthorizationDto, GetAuthorizationDto } from "../dtos/roles-permissions"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddAuthorizationUseCase {
     execute(addAuthorizationDto: AddAuthorizationDto): Promise<ApiResultResponse>
}

export interface DeleteAuthorizationUseCase {
     execute(deleteAuthorizationDto: DeleteAuthorizationDto): Promise<ApiResultResponse>
}

export interface GetAuthorizationUseCase {
     get(getAuthorizationDto: GetAuthorizationDto): Promise<ApiResultResponse>
}