import { AppLogger } from "../../../config/appLogger";
import { AddReview, GetReviews } from "../../../domain";
import { AddReviewDto } from "../../../domain/dtos/reviews/add-review.dto";
import { CustomError } from "../../../domain/errors/custom.error";
import { ReviewRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";

export class ReviewController {

     logger: AppLogger;

     constructor(private readonly reviewRepository: ReviewRepository) {
          this.logger = new AppLogger("ReviewController");
     }

     addReview = async (req: any, res: any) => {
          const [error, addReviewDto] = AddReviewDto.create(req.body);
          if (error) return this.handleError(error, res);

          await new AddReview(this.reviewRepository)
               .execute(addReviewDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     getReviews = async (req: any, res: any) => {
          try {
               const data = await new GetReviews(this.reviewRepository).execute();
               return res.json({ ...data, data: data.data.reviews });
          } catch (error) {
               this.handleCustomError(error as Error, res);
          }
     }

     private handleCustomError = (error: unknown, res: any) => {
          this.logger.Error(error as Error);
          if (error instanceof CustomError) {
               const responsError: ApiResultResponse = {
                    hasError: true,
                    message: error.message,
                    stackTrace: null,
                    status: "error",
                    statusCode: error.statusCode,
                    data: null
               }
               return res.status(error.statusCode).json(responsError)
          }
          return res.status(500).json({ error: 'Internal Server Error' })
     }

     handleError = (error: string, res: any) => {
          if (error) {
               const responsError: ApiResultResponse = {
                    hasError: true,
                    message: error as string,
                    stackTrace: null,
                    status: "error",
                    statusCode: 400,
                    data: null
               }
               return res.status(400).json(responsError)
          }
     }

}
