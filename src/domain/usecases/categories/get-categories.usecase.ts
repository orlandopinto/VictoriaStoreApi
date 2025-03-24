import { CustomError } from "../../errors/custom.error";
import { GetCategoriesUseCase } from "../../interfaces/ICategory";
import { CategoryRepository } from "../../repositories/category.repository";
import { ApiResultResponse } from "../../types";

export class GetCategories implements GetCategoriesUseCase {

     constructor(private readonly categoryRepository: CategoryRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const data = await this.categoryRepository.getCategories();
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: data,
                    message: null,
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