import { AttributeNameDatasource } from "../../domain/datasources";
import { AddAttributeNameDto } from "../../domain/dtos/attributeNames/add-attribute-name.dto";
import { DeleteAttributeNameDto } from "../../domain/dtos/attributeNames/delete-attribute-name.dto";
import { UpdateAttributeNameDto } from "../../domain/dtos/attributeNames/update-attribute-name.dto";
import { AddAttributeNameEntity, DeleteAttributeNameEntity, GetAttributeNamesEntity, UpdateAttributeNameEntity } from "../../domain/entities";
import { AttributeNamesRepository } from "../../domain/repositories";

export class AttributeNameRepositoryImpl implements AttributeNamesRepository {

     constructor(private readonly attributeNameDatasource: AttributeNameDatasource) { }

     addAttributeName(addAttributeNameDto: AddAttributeNameDto): Promise<AddAttributeNameEntity> {
          return this.attributeNameDatasource.addAttributeName(addAttributeNameDto);
     }

     updateAttributeName(updateAttributeNameDto: UpdateAttributeNameDto): Promise<UpdateAttributeNameEntity> {
          return this.attributeNameDatasource.updateAttributeName(updateAttributeNameDto);
     }

     deleteAttribute(deleteAttributeNameDto: DeleteAttributeNameDto): Promise<DeleteAttributeNameEntity> {
          return this.attributeNameDatasource.deleteAttribute(deleteAttributeNameDto);
     }

     getAttributeNames(): Promise<GetAttributeNamesEntity> {
          return this.attributeNameDatasource.getAttributeNames();
     }

}
