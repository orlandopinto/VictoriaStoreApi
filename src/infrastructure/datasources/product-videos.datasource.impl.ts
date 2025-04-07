
import { AddProductVideoEntity, DeleteProductVideoEntity, GetProductVideosEntity } from "../../domain/entities";
import { ProductVideosModel, productVideosSchema } from "../../data/mongodb";
import { AppLogger } from "../../config/appLogger";
import { ProductVideoDatasource } from "../../domain/datasources";
import { CustomError } from "../../domain/errors/custom.error";
import { AddProductVideoDto } from "../../domain/dtos/productVideos/add-product-video.dto";
import { DeleteProductVideoDto } from "../../domain/dtos/productVideos/delete-product-video.dto";

export class ProductVideoDatasourceImpl implements ProductVideoDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("ProductVideoDatasourceImpl");
     }

     async addProductVideo(addProductVideoDto: AddProductVideoDto): Promise<AddProductVideoEntity> {

          const { _id, public_id, secure_url } = addProductVideoDto;

          try {

               const result = await ProductVideosModel.create({ _id, public_id, secure_url })
               await result.save();
               return new AddProductVideoEntity(result._id.toString(), result.public_id, result.secure_url.toString());

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async deleteProductVideo(deleteProductVideoDto: DeleteProductVideoDto): Promise<DeleteProductVideoEntity> {

          const { _id } = deleteProductVideoDto;
          try {
               const productvideo = await ProductVideosModel.findOne({ _id: _id })
               if (!productvideo) throw CustomError.badRequest("Product Video does not exist or has been deleted.")
               await ProductVideosModel.deleteOne({ _id: _id })
               return new DeleteProductVideoEntity(_id);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getProductVideos(): Promise<GetProductVideosEntity> {
          try {
               const result = await ProductVideosModel.find() as unknown as [typeof productVideosSchema][]
               return new GetProductVideosEntity(result);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}
