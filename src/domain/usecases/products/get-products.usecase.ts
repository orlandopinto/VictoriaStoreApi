import { CustomError } from "../../errors/custom.error";
import { GetProductsUseCase } from "../../interfaces/IProducts";
import { ProductRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetProducts implements GetProductsUseCase {

     constructor(private readonly productRepository: ProductRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const products = await this.productRepository.getProducts();
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: products,
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
