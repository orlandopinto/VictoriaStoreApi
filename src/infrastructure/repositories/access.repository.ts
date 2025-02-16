import { AccessDatasource } from "../../domain/datasources";
import { AddAccessDto, DeleteAccessDto } from "../../domain/dtos/roles-permissions";
import { AddAccessEntity, DeleteAccessEntity, GetAccessEntity } from "../../domain/entities";
import { AccessRepository } from "../../domain/repositories";

export class AccessRepositoryImpl implements AccessRepository {

     constructor(private readonly accessDatasource: AccessDatasource) { }

     addAccess(addAccessDto: AddAccessDto): Promise<AddAccessEntity> {
          return this.accessDatasource.addAccess(addAccessDto);
     }

     deleteAccess(deleteAccessDto: DeleteAccessDto): Promise<DeleteAccessEntity> {
          return this.accessDatasource.deleteAccess(deleteAccessDto);
     }

     getAccesss(): Promise<GetAccessEntity> {
          return this.accessDatasource.getAccesss();
     }

}