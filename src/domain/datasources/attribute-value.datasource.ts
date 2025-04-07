
import { AddAttributeValueDto, UpdateAttributeValueDto, DeleteAttributeValueDto } from "../dtos/attributeValues";
import { DeleteAttributeValueEntity, GetAttributeValuesEntity, AddAttributeValueEntity, UpdateAttributeValueEntity } from "../entities";

export abstract class AttributeValueDatasource {

     abstract addAttributeValue(addAttributeValueDto: AddAttributeValueDto): Promise<AddAttributeValueEntity>
     abstract updateAttributeValue(updateAttributeValueDto: UpdateAttributeValueDto): Promise<UpdateAttributeValueEntity>
     abstract deleteAttributeValue(deleteAttributeValueDto: DeleteAttributeValueDto): Promise<DeleteAttributeValueEntity>
     abstract getAttributeValues(): Promise<GetAttributeValuesEntity>

}
