

import { AddReviewDto } from "../dtos/reviews/add-review.dto";
import { AddReviewEntity, GetReviewsEntity } from "../entities";

export abstract class ReviewRepository {

     abstract addReview(addReviewDto: AddReviewDto): Promise<AddReviewEntity>
     abstract getReviews(): Promise<GetReviewsEntity>

}
