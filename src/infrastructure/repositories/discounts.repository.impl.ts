import { DiscountDatasource } from "../../domain/datasources";
import { AddDiscountDto } from "../../domain/dtos/discounts/add-discount.dto";
import { DeleteDiscountDto } from "../../domain/dtos/discounts/delete-discount.dto";
import { UpdateDiscountDto } from "../../domain/dtos/discounts/update-discount.dto";
import { AddDiscountEntity, DeleteDiscountEntity, GetDiscountsEntity, UpdateDiscountEntity } from "../../domain/entities/discounts.entity";
import { DiscountRepository } from "../../domain/repositories/discounts.repository";

export class DiscountRepositoryImpl implements DiscountRepository {

     constructor(private readonly discountDatasource: DiscountDatasource) { }

     addDiscount(addDiscountDto: AddDiscountDto): Promise<AddDiscountEntity> {
          return this.discountDatasource.addDiscount(addDiscountDto);
     }

     updateDiscount(updateDiscountDto: UpdateDiscountDto): Promise<UpdateDiscountEntity> {
          return this.discountDatasource.updateDiscount(updateDiscountDto);
     }

     deleteDiscount(deleteDiscountDto: DeleteDiscountDto): Promise<DeleteDiscountEntity> {
          return this.discountDatasource.deleteDiscount(deleteDiscountDto);
     }

     getDiscounts(): Promise<GetDiscountsEntity> {
          return this.discountDatasource.getDiscounts();
     }

}