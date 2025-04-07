import { CustomError } from "../../errors/custom.error";
import { GetProductVideosUseCase } from "../../interfaces/IProductVideos";
import { ProductVideoRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetProductVideos implements GetProductVideosUseCase {

     constructor(private readonly productvideoRepository: ProductVideoRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const productvideos = await this.productvideoRepository.getProductVideos();
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: productvideos,
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
