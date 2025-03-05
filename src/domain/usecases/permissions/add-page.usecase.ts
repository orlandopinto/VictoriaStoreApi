import { AddPageDto } from "../../dtos/permissions";
import { CustomError } from "../../errors/custom.error";
import { AddPageUseCase } from "../../interfaces";
import { PageRepository } from '../../repositories';
import { ApiResultResponse } from "../../types";

export class AddPage implements AddPageUseCase {

     constructor(private readonly pageRepository: PageRepository) { }

     async execute(addPageDto: AddPageDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const page = await this.pageRepository.addPage(addPageDto);

               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: page,
                    message: "Page created successfully",
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