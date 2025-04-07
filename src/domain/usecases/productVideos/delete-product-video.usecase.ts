import { DeleteProductVideoDto } from "../../dtos/productVideos/delete-product-video.dto";
import { CustomError } from "../../errors/custom.error";
import { DeleteProductVideoUseCase } from "../../interfaces/IProductVideos";
import { ProductVideoRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteProductVideo implements DeleteProductVideoUseCase {

     constructor(private readonly productvideoRepository: ProductVideoRepository) { }

     async execute(deleteProductVideoDto: DeleteProductVideoDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const productvideo = await this.productvideoRepository.deleteProductVideo(deleteProductVideoDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: productvideo,
                    message: "ProductVideo deleted successfully",
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
