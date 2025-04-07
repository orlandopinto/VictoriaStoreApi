import { DeleteProductDto } from "../../dtos/products/delete-product.dto";
import { CustomError } from "../../errors/custom.error";
import { DeleteProductUseCase } from "../../interfaces/IProducts";
import { ProductRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteProduct implements DeleteProductUseCase {

     constructor(private readonly productRepository: ProductRepository) { }

     async execute(deleteProductDto: DeleteProductDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const product = await this.productRepository.deleteProduct(deleteProductDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: product,
                    message: "Product deleted successfully",
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
