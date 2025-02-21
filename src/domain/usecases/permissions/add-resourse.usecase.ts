import { AddResourseDto } from "../../dtos/permissions";
import { CustomError } from "../../errors/custom.error";
import { AddResourseUseCase } from "../../interfaces";
import { ResourseRepository } from '../../repositories';
import { ApiResultResponse } from "../../types";

export class AddResourse implements AddResourseUseCase {

     constructor(private readonly resourseRepository: ResourseRepository) { }

     async execute(addResourseDto: AddResourseDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const resourse = await this.resourseRepository.addResourse(addResourseDto);

               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: resourse,
                    message: "Resourse created successfully",
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