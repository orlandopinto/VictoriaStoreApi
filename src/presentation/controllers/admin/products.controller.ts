import { AppLogger } from "../../../config/appLogger";
import { AddProduct, DeleteProduct, GetProducts, UpdateProduct } from "../../../domain";
import { AddProductDto, UpdateProductDto, DeleteProductDto } from "../../../domain/dtos/products";
import { CustomError } from "../../../domain/errors/custom.error";
import { ProductRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";

export class ProductController {

     logger: AppLogger;

     constructor(private readonly productRepository: ProductRepository) {
          this.logger = new AppLogger("ProductController");
     }

     addProduct = async (req: any, res: any) => {
          const [error, addProductDto] = AddProductDto.create(req.body);
          if (error) return this.handleError(error, res);

          await new AddProduct(this.productRepository)
               .execute(addProductDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     updateProduct = async (req: any, res: any) => {
          const [error, updateProductDto] = UpdateProductDto.update(req.body);
          if (error) return this.handleError(error, res);

          await new UpdateProduct(this.productRepository)
               .execute(updateProductDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deleteProduct = async (req: any, res: any) => {
          try {
               const [error, deleteProductDto] = DeleteProductDto.delete(req.body);
               if (error) return this.handleError(error, res);

               await new DeleteProduct(this.productRepository)
                    .execute(deleteProductDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.handleCustomError(error, res);
          }
     }

     getProducts = async (req: any, res: any) => {
          try {
               const data = await new GetProducts(this.productRepository).execute();
               return res.json({ ...data, data: data.data.products });
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
