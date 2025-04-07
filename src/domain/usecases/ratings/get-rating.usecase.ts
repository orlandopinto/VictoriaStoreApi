import { CustomError } from "../../errors/custom.error";
import { GetRatingsUseCase } from "../../interfaces/IRatings";
import { RatingRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetRatings implements GetRatingsUseCase {

     constructor(private readonly ratingRepository: RatingRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const ratings = await this.ratingRepository.getRatings();
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: ratings,
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
