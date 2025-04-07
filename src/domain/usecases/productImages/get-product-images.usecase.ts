import { CustomError } from "../../errors/custom.error";
import { GetProductImagesUseCase } from "../../interfaces/IProductImages";
import { ProductImageRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetProductImages implements GetProductImagesUseCase {

     constructor(private readonly productimageRepository: ProductImageRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const productimages = await this.productimageRepository.getProductImages();
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: productimages,
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
