import { AddVariantDto, DeleteVariantDto, UpdateVariantDto } from "../../domain/dtos/variants";
import { AppLogger } from "../../config/appLogger";
import { VariantsModel, variantsSchema } from "../../data/mongodb/models/variants.model";
import { VariantDatasource } from "../../domain/datasources";
import { AddVariantEntity, DeleteVariantEntity, GetVariantsEntity, UpdateVariantEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";
import { ObjectId } from "mongoose";
import { Decimal } from "../../data/mongodb";

export class VariantDatasourceImpl implements VariantDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("VariantDatasourceImpl");
     }

     async addVariant(addVariantDto: AddVariantDto): Promise<AddVariantEntity> {

          const { product_id, price, discount_id, tax_id, sku, in_stock, stock, width, height, length, weight, sort_order, attributes } = addVariantDto;

          try {


               const result = await VariantsModel.create({ product_id, price, discount_id, sku, in_stock, stock, width, height, length, weight, sort_order, attributes })
               await result.save();
               return new AddVariantEntity(result._id.toString(), result.product_id as unknown as ObjectId, result.price as unknown as typeof Decimal, result.discount_id as unknown as ObjectId, result.tax_id as unknown as ObjectId, result.sku, result.in_stock, result.stock, result.width, result.height, result.length, result.weight, result.sort_order, result.attributes as unknown as ObjectId[]);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async updateVariant(updateVariantDto: UpdateVariantDto): Promise<UpdateVariantEntity> {
          const { _id, product_id, price, discount_id, tax_id, sku, in_stock, stock, width, height, length, weight, sort_order, attributes, createdAt, updatedAt } = updateVariantDto;
          try {
               const result = await VariantsModel.findByIdAndUpdate(
                    _id,
                    {
                         product_id, price, discount_id, tax_id, sku, in_stock, stock, width, height, length, weight, sort_order, attributes, createdAt, updatedAt
                    },
                    { new: true });

               if (!result)
                    throw CustomError.notFound('Variant not found.');

               return new UpdateVariantEntity(result._id.toString(), result.product_id as unknown as ObjectId, result.price as unknown as typeof Decimal, result.discount_id as unknown as ObjectId, result.tax_id as unknown as ObjectId, result.sku, result.in_stock, result.stock, result.width, result.height, result.length, result.weight, result.sort_order, result.attributes as unknown as ObjectId[], result.createdAt as unknown as string, result.updatedAt as unknown as string);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async deleteVariant(deleteVariantDto: DeleteVariantDto): Promise<DeleteVariantEntity> {

          const { _id } = deleteVariantDto;
          try {
               const variant = await VariantsModel.findOne({ _id: _id })
               if (!variant) throw CustomError.badRequest("Variant does not exist or has been deleted.")
               await VariantsModel.deleteOne({ _id: _id })
               //NOTE: Corregir la siguiente linea
               return new DeleteVariantEntity(_id);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getVariants(): Promise<GetVariantsEntity> {
          try {
               const result = await VariantsModel.find() as unknown as [typeof variantsSchema][]
               return new GetVariantsEntity(result);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}
