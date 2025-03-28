import { SystemUserDatasource } from "../../domain/datasources";
import { AddSystemUserDto } from "../../domain/dtos/systemusers/add-system-user.dto";
import { DeleteSystemUserDto } from "../../domain/dtos/systemusers/delete-system-user.dto";
import { UpdateSystemUserDto } from "../../domain/dtos/systemusers/update-system-user.dto";
import { AddSystemUserEntity, UpdateSystemUserEntity, DeleteSystemUserEntity, GetSystemUsersEntity } from "../../domain/entities";
import { SystemUserRepository } from "../../domain/repositories";

export class SystemUserRepositoryImpl implements SystemUserRepository {

     constructor(private readonly systemuserDatasource: SystemUserDatasource) { }

     addSystemUser(addSystemUserDto: AddSystemUserDto): Promise<AddSystemUserEntity> {
          return this.systemuserDatasource.addSystemUser(addSystemUserDto);
     }

     updateSystemUser(updateSystemUserDto: UpdateSystemUserDto): Promise<UpdateSystemUserEntity> {
          return this.systemuserDatasource.updateSystemUser(updateSystemUserDto);
     }

     deleteSystemUser(deleteSystemUserDto: DeleteSystemUserDto): Promise<DeleteSystemUserEntity> {
          return this.systemuserDatasource.deleteSystemUser(deleteSystemUserDto);
     }

     getSystemUsers(): Promise<GetSystemUsersEntity> {
          return this.systemuserDatasource.getSystemUsers();
     }

}
