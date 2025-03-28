import { AddDiscountDto } from "../dtos/discounts/add-discount.dto";
import { DeleteDiscountDto } from "../dtos/discounts/delete-discount.dto";
import { UpdateDiscountDto } from "../dtos/discounts/update-discount.dto";
import { DeleteDiscountEntity, GetDiscountsEntity, AddDiscountEntity, UpdateDiscountEntity } from "../entities";

export abstract class DiscountRepository {

     abstract addDiscount(addDiscountDto: AddDiscountDto): Promise<AddDiscountEntity>
     abstract updateDiscount(updateDiscountDto: UpdateDiscountDto): Promise<UpdateDiscountEntity>
     abstract deleteDiscount(deleteDiscountDto: DeleteDiscountDto): Promise<DeleteDiscountEntity>
     abstract getDiscounts(): Promise<GetDiscountsEntity>

}
