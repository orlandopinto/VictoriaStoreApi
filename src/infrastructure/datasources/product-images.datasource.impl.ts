
import { AppLogger } from "../../config/appLogger";
import { ProductImagesModel, productImagesSchema } from "../../data/mongodb";
import { ProductImageDatasource } from "../../domain/datasources";
import { AddProductImageDto } from "../../domain/dtos/productImages/add-product-image.dto";
import { DeleteProductImageDto } from "../../domain/dtos/productImages/delete-product-image.dto";
import { AddProductImageEntity, DeleteProductImageEntity, GetProductImagesEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class ProductImageDatasourceImpl implements ProductImageDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("ProductImageDatasourceImpl");
     }

     async addProductImage(addProductImageDto: AddProductImageDto): Promise<AddProductImageEntity> {

          const { _id, public_id, secure_url } = addProductImageDto;

          try {

               const result = await ProductImagesModel.create({ _id, public_id, secure_url })
               await result.save();
               return new AddProductImageEntity(result._id.toString(), result.public_id.toString(), result.secure_url.toString());

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async deleteProductImage(deleteProductImageDto: DeleteProductImageDto): Promise<DeleteProductImageEntity> {

          const { _id } = deleteProductImageDto;
          try {
               const productimage = await ProductImagesModel.findOne({ _id: _id })
               if (!productimage) throw CustomError.badRequest("Product Image does not exist or has been deleted.")
               await ProductImagesModel.deleteOne({ _id: _id })
               return new DeleteProductImageEntity(_id);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getProductImages(): Promise<GetProductImagesEntity> {
          try {
               const result = await ProductImagesModel.find() as unknown as [typeof productImagesSchema][]
               return new GetProductImagesEntity(result);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}
