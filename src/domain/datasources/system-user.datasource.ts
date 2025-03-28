import { AddSystemUserDto } from "../dtos/systemusers/add-system-user.dto";
import { DeleteSystemUserDto } from "../dtos/systemusers/delete-system-user.dto";
import { UpdateSystemUserDto } from "../dtos/systemusers/update-system-user.dto";
import { AddSystemUserEntity, UpdateSystemUserEntity } from "../entities";
import { DeleteSystemUserEntity, GetSystemUsersEntity } from "../entities/system-users.entity";

export abstract class SystemUserDatasource {

     abstract addSystemUser(addSystemUserDto: AddSystemUserDto): Promise<AddSystemUserEntity>
     abstract updateSystemUser(updateSystemUserDto: UpdateSystemUserDto): Promise<UpdateSystemUserEntity>
     abstract deleteSystemUser(deleteSystemUserDto: DeleteSystemUserDto): Promise<DeleteSystemUserEntity>
     abstract getSystemUsers(): Promise<GetSystemUsersEntity>

}
