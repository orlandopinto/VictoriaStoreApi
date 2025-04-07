import { CustomError } from "../../errors/custom.error";
import { GetReviewsUseCase } from "../../interfaces/IReviews";
import { ReviewRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetReviews implements GetReviewsUseCase {

     constructor(private readonly reviewRepository: ReviewRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const reviews = await this.reviewRepository.getReviews();
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: reviews,
                    message: null,
                    statusCode: 200,
                    stackTrace: null
               }
          } catch (error) {
               const err = error as Error
               let statusCode: number = 500;
               if (error instanceof CustomError) {
                    statusCode = error.statusCode;
               }
               resultResponse = {
                    status: "error",
                    hasError: true,
                    data: null,
                    message: err.message,
                    statusCode: statusCode,
                    stackTrace: err.stack
               }
          }
          return resultResponse;
     }
}
