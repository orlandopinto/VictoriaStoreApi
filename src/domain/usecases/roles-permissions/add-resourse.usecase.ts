import { AddResourseDto } from "../../dtos/roles-permissions";
import { AddResourseUseCase } from "../../interfaces";
import { ResourseRepository } from '../../repositories';
import { ApiResultResponse } from "../../types";

export class AddResourse implements AddResourseUseCase {

     constructor(private readonly resourseRepository: ResourseRepository) { }

     async execute(addResourseDto: AddResourseDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const resourse = await this.resourseRepository.addResourse(addResourseDto);

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