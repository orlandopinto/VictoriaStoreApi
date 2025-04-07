import { AppLogger } from "../../../config/appLogger";
import { AddProductVideo, DeleteProductVideo, GetProductVideos } from "../../../domain";
import { AddProductVideoDto } from "../../../domain/dtos/productVideos/add-product-video.dto";
import { DeleteProductVideoDto } from "../../../domain/dtos/productVideos/delete-product-video.dto";
import { CustomError } from "../../../domain/errors/custom.error";
import { ProductVideoRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";

export class ProductVideoController {

     logger: AppLogger;

     constructor(private readonly productvideoRepository: ProductVideoRepository) {
          this.logger = new AppLogger("ProductVideoController");
     }

     addProductVideo = async (req: any, res: any) => {
          const [error, addProductVideoDto] = AddProductVideoDto.create(req.body);
          if (error) return this.handleError(error, res);

          await new AddProductVideo(this.productvideoRepository)
               .execute(addProductVideoDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deleteProductVideo = async (req: any, res: any) => {
          try {
               const [error, deleteProductVideoDto] = DeleteProductVideoDto.delete(req.body);
               if (error) return this.handleError(error, res);

               await new DeleteProductVideo(this.productvideoRepository)
                    .execute(deleteProductVideoDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.handleCustomError(error, res);
          }
     }

     getProductVideos = async (req: any, res: any) => {
          try {
               const data = await new GetProductVideos(this.productvideoRepository).execute();
               return res.json({ ...data, data: data.data.productvideos });
          } catch (error) {
               this.handleCustomError(error as Error, res);
          }
     }

     private handleCustomError = (error: unknown, res: any) => {
          this.logger.Error(error as Error);
          if (error instanceof CustomError) {
               const responsError: ApiResultResponse = {
                    hasError: true,
                    message: error.message,
                    stackTrace: null,
                    status: "error",
                    statusCode: error.statusCode,
                    data: null
               }
               return res.status(error.statusCode).json(responsError)
          }
          return res.status(500).json({ error: 'Internal Server Error' })
     }

     handleError = (error: string, res: any) => {
          if (error) {
               const responsError: ApiResultResponse = {
                    hasError: true,
                    message: error as string,
                    stackTrace: null,
                    status: "error",
                    statusCode: 400,
                    data: null
               }
               return res.status(400).json(responsError)
          }
     }

}
