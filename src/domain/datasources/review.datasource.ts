
import { AddReviewDto } from "../dtos/reviews/add-review.dto";
import { AddReviewEntity, GetReviewsEntity } from "../entities";

export abstract class ReviewDatasource {

     abstract addReview(addReviewDto: AddReviewDto): Promise<AddReviewEntity>
     abstract getReviews(): Promise<GetReviewsEntity>

}
