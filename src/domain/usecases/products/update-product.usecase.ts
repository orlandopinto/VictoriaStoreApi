import { UpdateProductDto } from "../../dtos/products/update-product.dto";
import { CustomError } from "../../errors/custom.error";
import { UpdateProductUseCase } from "../../interfaces/IProducts";
import { ProductRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class UpdateProduct implements UpdateProductUseCase {

     constructor(private readonly productRepository: ProductRepository) { }

     async execute(updateProductDto: UpdateProductDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const product = await this.productRepository.updateProduct(updateProductDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: product,
                    message: "Product updated successfully",
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
