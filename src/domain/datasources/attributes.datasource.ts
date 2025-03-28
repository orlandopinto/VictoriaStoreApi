import { AddAttributeDto } from "../dtos/attributes/add-attribute.dto";
import { DeleteAttributeDto } from "../dtos/attributes/delete-attribute.dto";
import { UpdateAttributeDto } from "../dtos/attributes/update-attribute.dto";
import { DeleteAttributeEntity, GetAttributesEntity, AddAttributeEntity, UpdateAttributeEntity } from "../entities";

export abstract class AttributeDatasource {

     abstract addAttribute(addAttributeDto: AddAttributeDto): Promise<AddAttributeEntity>
     abstract updateAttribute(updateAttributeDto: UpdateAttributeDto): Promise<UpdateAttributeEntity>
     abstract deleteAttribute(deleteAttributeDto: DeleteAttributeDto): Promise<DeleteAttributeEntity>
     abstract getAttributes(): Promise<GetAttributesEntity>

}
