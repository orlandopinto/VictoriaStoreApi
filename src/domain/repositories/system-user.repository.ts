import { AddSystemUserDto } from "../dtos/systemusers/add-system-user.dto";
import { DeleteSystemUserDto } from "../dtos/systemusers/delete-system-user.dto";
import { UpdateSystemUserDto } from "../dtos/systemusers/update-system-user.dto";

import { DeleteSystemUserEntity, GetSystemUsersEntity, AddSystemUserEntity, UpdateSystemUserEntity } from "../entities";

export abstract class SystemUserRepository {

     abstract addSystemUser(addSystemUserDto: AddSystemUserDto): Promise<AddSystemUserEntity>
     abstract updateSystemUser(updateSystemUserDto: UpdateSystemUserDto): Promise<UpdateSystemUserEntity>
     abstract deleteSystemUser(deleteSystemUserDto: DeleteSystemUserDto): Promise<DeleteSystemUserEntity>
     abstract getSystemUsers(): Promise<GetSystemUsersEntity>

}
