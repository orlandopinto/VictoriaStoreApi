import { AddReviewDto } from "../../dtos/reviews/add-review.dto";
import { CustomError } from "../../errors/custom.error";
import { AddReviewUseCase } from "../../interfaces";
import { ReviewRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class AddReview implements AddReviewUseCase {

     constructor(private readonly reviewRepository: ReviewRepository) { }

     async execute(addReviewDto: AddReviewDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const review = await this.reviewRepository.addReview(addReviewDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: review,
                    message: "Review created successfully",
                    statusCode: 201,
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
