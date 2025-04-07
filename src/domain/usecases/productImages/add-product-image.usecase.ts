import { AddProductImageDto } from "../../dtos/productImages/add-product-image.dto";
import { CustomError } from "../../errors/custom.error";
import { AddProductImageUseCase } from "../../interfaces";
import { ProductImageRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class AddProductImage implements AddProductImageUseCase {

     constructor(private readonly productimageRepository: ProductImageRepository) { }

     async execute(addProductImageDto: AddProductImageDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const productimage = await this.productimageRepository.addProductImage(addProductImageDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: productimage,
                    message: "ProductImage created successfully",
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
