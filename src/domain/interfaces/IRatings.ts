

import { AddRatingDto, UpdateRatingDto, DeleteRatingDto } from "../dtos/ratings"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddRatingUseCase {
     execute(addRatingDto: AddRatingDto): Promise<ApiResultResponse>
}

export interface UpdateRatingUseCase {
     execute(updateRatingDto: UpdateRatingDto): Promise<ApiResultResponse>
}

export interface DeleteRatingUseCase {
     execute(deleteRatingDto: DeleteRatingDto): Promise<ApiResultResponse>
}

export interface GetRatingsUseCase {
     execute(): Promise<ApiResultResponse>
}
