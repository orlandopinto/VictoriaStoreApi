import { GetResourseEntity } from "../../entities";
import { CustomError } from "../../errors/custom.error";
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