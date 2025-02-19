import { GetResourseEntity } from "../../entities";
import { GetResoursesUseCase } from "../../interfaces";
import { ResourseRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetResourses implements GetResoursesUseCase {

     constructor(private readonly resoursesRepository: ResourseRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const resourses = await this.resoursesRepository.getResourses();
               const data = { ...resourses } as unknown as GetResourseEntity
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: data,
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