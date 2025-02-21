import { DeleteResourseDto } from "../../dtos/permissions";
import { CustomError } from "../../errors/custom.error";
import { DeleteResourseUseCase } from "../../interfaces/IResourses";
import { ResourseRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteResourse implements DeleteResourseUseCase {

     constructor(private readonly resourseRepository: ResourseRepository) { }

     async execute(deleteResourseDto: DeleteResourseDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const resourse = await this.resourseRepository.deleteResourse(deleteResourseDto);

               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: resourse,
                    message: "Resourse deleted successfully.",
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