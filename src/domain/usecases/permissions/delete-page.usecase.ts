import { DeletePageDto } from "../../dtos/permissions";
import { CustomError } from "../../errors/custom.error";
import { DeletePageUseCase } from "../../interfaces/IPage";
import { PageRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeletePage implements DeletePageUseCase {

     constructor(private readonly pageRepository: PageRepository) { }

     async execute(deletePageDto: DeletePageDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const page = await this.pageRepository.deletePage(deletePageDto);

               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: page,
                    message: "Page deleted successfully.",
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