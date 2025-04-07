import { AddProductVideoDto } from "../../dtos/productVideos/add-product-video.dto";
import { CustomError } from "../../errors/custom.error";
import { AddProductVideoUseCase } from "../../interfaces";
import { ProductVideoRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class AddProductVideo implements AddProductVideoUseCase {

     constructor(private readonly productvideoRepository: ProductVideoRepository) { }

     async execute(addProductVideoDto: AddProductVideoDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const productvideo = await this.productvideoRepository.addProductVideo(addProductVideoDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: productvideo,
                    message: "ProductVideo created successfully",
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
