import { AttributeValueDatasource } from "../../domain/datasources";
import { AddAttributeValueDto, UpdateAttributeValueDto, DeleteAttributeValueDto } from "../../domain/dtos/attributeValues";
import { AddAttributeValueEntity, DeleteAttributeValueEntity, GetAttributeValuesEntity, UpdateAttributeValueEntity } from "../../domain/entities";
import { AttributeValueRepository } from "../../domain/repositories";

export class AttributeValueRepositoryImpl implements AttributeValueRepository {

     constructor(private readonly attributeValueDatasource: AttributeValueDatasource) { }

     addAttributeValue(addAttributeValueDto: AddAttributeValueDto): Promise<AddAttributeValueEntity> {
          return this.attributeValueDatasource.addAttributeValue(addAttributeValueDto);
     }

     updateAttributeValue(updateAttributeValueDto: UpdateAttributeValueDto): Promise<UpdateAttributeValueEntity> {
          return this.attributeValueDatasource.updateAttributeValue(updateAttributeValueDto);
     }

     deleteAttributeValue(deleteAttributeValueDto: DeleteAttributeValueDto): Promise<DeleteAttributeValueEntity> {
          return this.attributeValueDatasource.deleteAttributeValue(deleteAttributeValueDto);
     }

     getAttributeValues(): Promise<GetAttributeValuesEntity> {
          return this.attributeValueDatasource.getAttributeValues();
     }

}
