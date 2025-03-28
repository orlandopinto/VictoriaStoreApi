import { AttributeDatasource } from "../../domain/datasources";
import { AddAttributeDto } from "../../domain/dtos/attributes/add-attribute.dto";
import { DeleteAttributeDto } from "../../domain/dtos/attributes/delete-attribute.dto";
import { UpdateAttributeDto } from "../../domain/dtos/attributes/update-attribute.dto";
import { AddAttributeEntity, DeleteAttributeEntity, GetAttributesEntity, UpdateAttributeEntity } from "../../domain/entities";
import { AttributeRepository } from "../../domain/repositories";

export class AttributeRepositoryImpl implements AttributeRepository {

     constructor(private readonly attributeDatasource: AttributeDatasource) { }

     addAttribute(addAttributeDto: AddAttributeDto): Promise<AddAttributeEntity> {
          return this.attributeDatasource.addAttribute(addAttributeDto);
     }

     updateAttribute(updateAttributeDto: UpdateAttributeDto): Promise<UpdateAttributeEntity> {
          return this.attributeDatasource.updateAttribute(updateAttributeDto);
     }

     deleteAttribute(deleteAttributeDto: DeleteAttributeDto): Promise<DeleteAttributeEntity> {
          return this.attributeDatasource.deleteAttribute(deleteAttributeDto);
     }

     getAttributes(): Promise<GetAttributesEntity> {
          return this.attributeDatasource.getAttributes();
     }

}
