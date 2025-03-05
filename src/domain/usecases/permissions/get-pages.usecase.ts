import { GetPagesEntity } from "../../entities";
import { CustomError } from "../../errors/custom.error";
import { GetPagesUseCase } from "../../interfaces";
import { PageRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetPages implements GetPagesUseCase {

     constructor(private readonly pageRepository: PageRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const pages = await this.pageRepository.getPages();
               const data = { ...pages } as unknown as GetPagesEntity
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