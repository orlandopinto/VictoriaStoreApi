import { DeleteProductImageDto } from "../../dtos/productImages/delete-product-image.dto";
import { CustomError } from "../../errors/custom.error";
import { DeleteProductImageUseCase } from "../../interfaces/IProductImages";
import { ProductImageRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteProductImage implements DeleteProductImageUseCase {

     constructor(private readonly productimageRepository: ProductImageRepository) { }

     async execute(deleteProductImageDto: DeleteProductImageDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const productimage = await this.productimageRepository.deleteProductImage(deleteProductImageDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: productimage,
                    message: "ProductImage deleted successfully",
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
