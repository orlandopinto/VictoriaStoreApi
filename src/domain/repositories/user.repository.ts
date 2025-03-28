import { AddUserDto } from "../dtos/users/add-user.dto";
import { DeleteUserDto } from "../dtos/users/delete-user.dto";
import { UpdateUserDto } from "../dtos/users/update-user.dto";
import { AddUserEntity, UpdateUserEntity, DeleteUserEntity, GetUsersEntity } from "../entities/users.entity";


export abstract class UserRepository {

     abstract addUser(addUserDto: AddUserDto): Promise<AddUserEntity>
     abstract updateUser(updateUserDto: UpdateUserDto): Promise<UpdateUserEntity>
     abstract deleteUser(deleteUserDto: DeleteUserDto): Promise<DeleteUserEntity>
     abstract getUsers(): Promise<GetUsersEntity>

}
