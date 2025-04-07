import { VariantDatasource } from "../../domain/datasources";
import { AddVariantDto, UpdateVariantDto, DeleteVariantDto } from "../../domain/dtos/variants";
import { AddVariantEntity, DeleteVariantEntity, GetVariantsEntity, UpdateVariantEntity } from "../../domain/entities";
import { VariantRepository } from "../../domain/repositories";

export class VariantRepositoryImpl implements VariantRepository {

     constructor(private readonly variantDatasource: VariantDatasource) { }

     addVariant(addVariantDto: AddVariantDto): Promise<AddVariantEntity> {
          return this.variantDatasource.addVariant(addVariantDto);
     }

     updateVariant(updateVariantDto: UpdateVariantDto): Promise<UpdateVariantEntity> {
          return this.variantDatasource.updateVariant(updateVariantDto);
     }

     deleteVariant(deleteVariantDto: DeleteVariantDto): Promise<DeleteVariantEntity> {
          return this.variantDatasource.deleteVariant(deleteVariantDto);
     }

     getVariants(): Promise<GetVariantsEntity> {
          return this.variantDatasource.getVariants();
     }

}
