import { DeleteResourseDto } from "../../dtos/roles-permissions";
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
                    message: null,
                    statusCode: 200,
                    stackTrace: null,
                    errorMessage: null
               }
          } catch (error) {
               const err = error as Error
               resultResponse = {
                    status: "error",
                    hasError: true,
                    data: null,
                    message: null,
                    statusCode: 500,
                    stackTrace: err.stack,
                    errorMessage: err.message
               }
          }
          return resultResponse;
     }
}