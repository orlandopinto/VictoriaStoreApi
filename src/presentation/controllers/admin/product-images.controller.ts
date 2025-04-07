import { AppLogger } from "../../../config/appLogger";
import { AddProductImageDto } from "../../../domain/dtos/productImages/add-product-image.dto";
import { DeleteProductImageDto } from "../../../domain/dtos/productImages/delete-product-image.dto";
import { CustomError } from "../../../domain/errors/custom.error";
import { ProductImageRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";
import { AddProductImage } from "../../../domain/usecases/productImages/add-product-image.usecase";
import { DeleteProductImage } from "../../../domain/usecases/productImages/delete-product-image.usecase";
import { GetProductImages } from "../../../domain/usecases/productImages/get-product-images.usecase";

export class ProductImageController {

     logger: AppLogger;

     constructor(private readonly productimageRepository: ProductImageRepository) {
          this.logger = new AppLogger("ProductImageController");
     }

     addProductImage = async (req: any, res: any) => {
          const [error, addProductImageDto] = AddProductImageDto.create(req.body);
          if (error) return this.handleError(error, res);

          await new AddProductImage(this.productimageRepository)
               .execute(addProductImageDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deleteProductImage = async (req: any, res: any) => {
          try {
               const [error, deleteProductImageDto] = DeleteProductImageDto.delete(req.body);
               if (error) return this.handleError(error, res);

               await new DeleteProductImage(this.productimageRepository)
                    .execute(deleteProductImageDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.handleCustomError(error, res);
          }
     }

     getProductImages = async (req: any, res: any) => {
          try {
               const data = await new GetProductImages(this.productimageRepository).execute();
               return res.json({ ...data, data: data.data.productimages });
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
