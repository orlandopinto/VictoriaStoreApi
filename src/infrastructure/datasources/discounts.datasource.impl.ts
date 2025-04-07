import { AddDiscountDto } from "../../domain/dtos/discounts/add-discount.dto";
import { DeleteDiscountDto } from "../../domain/dtos/discounts/delete-discount.dto";
import { UpdateDiscountDto } from "../../domain/dtos/discounts/update-discount.dto";
import { AppLogger } from "../../config/appLogger";
import { DiscountsModel, discountsSchema } from "../../data/mongodb/models/discounts.model";
import { DiscountDatasource } from "../../domain/datasources";
import { AddDiscountEntity, DeleteDiscountEntity, GetDiscountsEntity, UpdateDiscountEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class DiscountDatasourceImpl implements DiscountDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("DiscountDatasourceImpl");
     }

     async addDiscount(addDiscountDto: AddDiscountDto): Promise<AddDiscountEntity> {

          const { discountName, discountValue } = addDiscountDto;

          try {

               const discount = await DiscountsModel.findOne({ discountName: discountName })
               if (discount) throw CustomError.badRequest('Discount already exists.')
               const result = await DiscountsModel.create({ discountName, discountValue })
               await result.save();
               return new AddDiscountEntity(result._id.toString(), result.discountName, result.discountValue.toString(),);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async updateDiscount(updateDiscountDto: UpdateDiscountDto): Promise<UpdateDiscountEntity> {
          const { _id, discountName, discountValue } = updateDiscountDto;
          try {
               const result = await DiscountsModel.findByIdAndUpdate(
                    _id,
                    {
                         _id, discountName, discountValue
                    },
                    { new: true });

               if (!result)
                    throw CustomError.notFound('Discount not found.');

               return new UpdateDiscountEntity(result._id.toString(), result.discountName, result.discountValue.toString(), result.createdAt as unknown as string, result.updatedAt as unknown as string);
               //Agregar si es necesario result.createdAt as unknown as string, result.updatedAt as unknown as string);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async deleteDiscount(deleteDiscountDto: DeleteDiscountDto): Promise<DeleteDiscountEntity> {

          const { _id } = deleteDiscountDto;
          try {
               const discount = await DiscountsModel.findOne({ _id: _id })
               if (!discount) throw CustomError.badRequest("Discount does not exist or has been deleted.")
               await DiscountsModel.deleteOne({ _id: _id })
               //NOTE: Corregir la siguiente linea
               return new DeleteDiscountEntity(discount.discountName);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getDiscounts(): Promise<GetDiscountsEntity> {
          try {
               const result = await DiscountsModel.find() as unknown as [typeof discountsSchema][]
               return new GetDiscountsEntity(result);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}