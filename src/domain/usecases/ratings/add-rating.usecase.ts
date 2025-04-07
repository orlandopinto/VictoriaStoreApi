import { AddRatingDto } from "../../dtos/ratings";
import { CustomError } from "../../errors/custom.error";
import { AddRatingUseCase } from "../../interfaces";
import { RatingRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class AddRating implements AddRatingUseCase {

     constructor(private readonly ratingRepository: RatingRepository) { }

     async execute(addRatingDto: AddRatingDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const rating = await this.ratingRepository.addRating(addRatingDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: rating,
                    message: "Rating created successfully",
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
