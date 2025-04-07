import { AddReviewDto } from "../dtos/reviews/add-review.dto"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddReviewUseCase {
     execute(addReviewDto: AddReviewDto): Promise<ApiResultResponse>
}

export interface GetReviewsUseCase {
     execute(): Promise<ApiResultResponse>
}
