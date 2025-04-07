

import { AddVariantDto, UpdateVariantDto, DeleteVariantDto } from "../dtos/variants";
import { DeleteVariantEntity, GetVariantsEntity, AddVariantEntity, UpdateVariantEntity } from "../entities";

export abstract class VariantRepository {

     abstract addVariant(addVariantDto: AddVariantDto): Promise<AddVariantEntity>
     abstract updateVariant(updateVariantDto: UpdateVariantDto): Promise<UpdateVariantEntity>
     abstract deleteVariant(deleteVariantDto: DeleteVariantDto): Promise<DeleteVariantEntity>
     abstract getVariants(): Promise<GetVariantsEntity>

}
