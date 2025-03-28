import { AddUserDto } from "../../domain/dtos/users/add-user.dto";
import { DeleteUserDto } from "../../domain/dtos/users/delete-user.dto";
import { UpdateUserDto } from "../../domain/dtos/users/update-user.dto";

import { DeleteUserEntity, GetUsersEntity, AddUserEntity, UpdateUserEntity } from "../entities";

export abstract class UserDatasource {

     abstract addUser(addUserDto: AddUserDto): Promise<AddUserEntity>
     abstract updateUser(updateUserDto: UpdateUserDto): Promise<UpdateUserEntity>
     abstract deleteUser(deleteUserDto: DeleteUserDto): Promise<DeleteUserEntity>
     abstract getUsers(): Promise<GetUsersEntity>

}
