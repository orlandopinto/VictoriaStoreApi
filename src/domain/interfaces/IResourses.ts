import { AddResourseDto, DeleteResourseDto } from "../dtos/roles-permissions/index"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddResourseUseCase {
     execute(addResourseDto: AddResourseDto): Promise<ApiResultResponse>
}

export interface DeleteResourseUseCase {
     execute(deleteResourseDto: DeleteResourseDto): Promise<ApiResultResponse>
}