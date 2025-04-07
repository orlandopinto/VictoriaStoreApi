import { ReviewDatasource } from "../../domain/datasources";
import { AddReviewDto } from "../../domain/dtos/reviews/add-review.dto";
import { AddReviewEntity, GetReviewsEntity } from "../../domain/entities";
import { ReviewRepository } from "../../domain/repositories";

export class ReviewRepositoryImpl implements ReviewRepository {

     constructor(private readonly reviewDatasource: ReviewDatasource) { }

     addReview(addReviewDto: AddReviewDto): Promise<AddReviewEntity> {
          return this.reviewDatasource.addReview(addReviewDto);
     }

     getReviews(): Promise<GetReviewsEntity> {
          return this.reviewDatasource.getReviews();
     }

}
