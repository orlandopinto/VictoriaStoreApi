import { AppLogger } from "../../config/appLogger";
import { ProductsModel, productsSchema } from "../../data/mongodb";
import { ProductDatasource } from "../../domain/datasources";
import { AddProductDto, UpdateProductDto, DeleteProductDto } from "../../domain/dtos/products";
import { AddProductEntity, DeleteProductEntity, GetProductsEntity, UpdateProductEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";
import { ObjectId } from "mongoose";

export class ProductDatasourceImpl implements ProductDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("ProductDatasourceImpl");
     }

     async addProduct(addProductDto: AddProductDto): Promise<AddProductEntity> {

          const { category_id, subCategories, title, subTitle, productDescription, public_id, secure_url, isActive, productImages, productVideos, variants, rating_id, reviews } = addProductDto;

          try {

               const product = await ProductsModel.findOne({ title: title })
               if (product) throw CustomError.badRequest('Product already exists.')
               const result = await ProductsModel.create({ category_id, subCategories, title, subTitle, productDescription, public_id, secure_url, isActive, productImages, productVideos, variants, rating_id, reviews })
               await result.save();
               return new AddProductEntity(result.category_id as unknown as ObjectId, result.subCategories as unknown as ObjectId[], result.title, result.subTitle, result.productDescription, result.public_id, result.secure_url, result.isActive, result.productImages as unknown as ObjectId[], result.productVideos as unknown as ObjectId[], result.variants as unknown as ObjectId[], result.rating_id as unknown as ObjectId, result.reviews as unknown as ObjectId[]);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async updateProduct(updateProductDto: UpdateProductDto): Promise<UpdateProductEntity> {
          const { _id, category_id, subCategories, title, subTitle, productDescription, public_id, secure_url, isActive, productImages, productVideos, variants, rating_id, reviews } = updateProductDto;
          try {
               const result = await ProductsModel.findByIdAndUpdate(
                    _id,
                    {
                         category_id, subCategories, title, subTitle, productDescription, public_id, secure_url, isActive, productImages, productVideos, variants, rating_id, reviews
                    },
                    { new: true });

               if (!result)
                    throw CustomError.notFound('Product not found.');

               return new UpdateProductEntity(_id, result.category_id as unknown as ObjectId, result.subCategories as unknown as ObjectId[], result.title, result.subTitle, result.productDescription, result.public_id, result.secure_url, result.isActive, result.productImages as unknown as ObjectId[], result.productVideos as unknown as ObjectId[], result.variants as unknown as ObjectId[], result.rating_id as unknown as ObjectId, result.reviews as unknown as ObjectId[], result.createdAt as unknown as string, result.updatedAt as unknown as string);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async deleteProduct(deleteProductDto: DeleteProductDto): Promise<DeleteProductEntity> {

          const { _id } = deleteProductDto;
          try {
               const product = await ProductsModel.findOne({ _id: _id })
               if (!product) throw CustomError.badRequest("Product does not exist or has been deleted.")
               await ProductsModel.deleteOne({ _id: _id })
               return new DeleteProductEntity(_id);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getProducts(): Promise<GetProductsEntity> {
          try {
               const result = await ProductsModel.find() as unknown as [typeof productsSchema][]
               return new GetProductsEntity(result);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}
