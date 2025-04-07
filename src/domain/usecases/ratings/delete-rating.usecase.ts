import { DeleteRatingDto } from "../../dtos/ratings";
import { CustomError } from "../../errors/custom.error";
import { DeleteRatingUseCase } from "../../interfaces/IRatings";
import { RatingRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteRating implements DeleteRatingUseCase {

     constructor(private readonly ratingRepository: RatingRepository) { }

     async execute(deleteRatingDto: DeleteRatingDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const rating = await this.ratingRepository.deleteRating(deleteRatingDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: rating,
                    message: "Rating deleted successfully",
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
