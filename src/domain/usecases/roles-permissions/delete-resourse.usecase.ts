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

               resultResponse.response = {
                    status: "success",
                    hasError: false,
                    data: resourse,
                    statusCode: 200,
                    error: null,
                    errorMessage: ""
               }
          } catch (error) {
               resultResponse.response = {
                    status: "error",
                    hasError: true,
                    statusCode: 500,
                    error: error,
                    errorMessage: (error as any).errmsg
               }
          }
          return resultResponse;
     }
}