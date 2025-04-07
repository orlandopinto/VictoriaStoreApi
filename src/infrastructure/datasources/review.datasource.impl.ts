
import { ObjectId } from "mongoose";
import { AppLogger } from "../../config/appLogger";
import { Decimal, ReviewsModel, reviewsSchema } from "../../data/mongodb";
import { ReviewDatasource } from "../../domain/datasources";
import { AddReviewDto } from "../../domain/dtos/reviews/add-review.dto";
import { AddReviewEntity, GetReviewsEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class ReviewDatasourceImpl implements ReviewDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("ReviewDatasourceImpl");
     }

     async addReview(addReviewDto: AddReviewDto): Promise<AddReviewEntity> {

          const { _id, product_id, user_Id, rating, count, comment } = addReviewDto;

          try {

               const result = await ReviewsModel.create({ _id, product_id, user_Id, rating, count, comment })
               await result.save();
               return new AddReviewEntity(result._id.toString(), result.product_id as unknown as ObjectId, result.user_Id as unknown as ObjectId, result.rating as unknown as typeof Decimal, result.count, result.comment);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getReviews(): Promise<GetReviewsEntity> {
          try {
               const result = await ReviewsModel.find() as unknown as [typeof reviewsSchema][]
               return new GetReviewsEntity(result);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}
