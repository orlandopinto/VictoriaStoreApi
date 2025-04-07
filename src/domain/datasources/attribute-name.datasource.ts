import { AddAttributeNameDto } from "../dtos/attributeNames/add-attribute-name.dto";
import { DeleteAttributeNameDto } from "../dtos/attributeNames/delete-attribute-name.dto";
import { UpdateAttributeNameDto } from "../dtos/attributeNames/update-attribute-name.dto";
import { DeleteAttributeNameEntity, GetAttributeNamesEntity, AddAttributeNameEntity, UpdateAttributeNameEntity } from "../entities";

export abstract class AttributeNameDatasource {

     abstract addAttributeName(addAttributeNameDto: AddAttributeNameDto): Promise<AddAttributeNameEntity>
     abstract updateAttributeName(updateAttributeNameDto: UpdateAttributeNameDto): Promise<UpdateAttributeNameEntity>
     abstract deleteAttribute(deleteAttributeNameDto: DeleteAttributeNameDto): Promise<DeleteAttributeNameEntity>
     abstract getAttributeNames(): Promise<GetAttributeNamesEntity>

}
