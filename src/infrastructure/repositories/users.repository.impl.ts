import { UserDatasource } from "../../domain/datasources/user.datasource";
import { AddUserDto } from "../../domain/dtos/users/add-user.dto";
import { DeleteUserDto } from "../../domain/dtos/users/delete-user.dto";
import { UpdateUserDto } from "../../domain/dtos/users/update-user.dto";
import { AddUserEntity, UpdateUserEntity, DeleteUserEntity, GetUsersEntity } from "../../domain/entities";
import { UserRepository } from "../../domain/repositories";

export class UserRepositoryImpl implements UserRepository {

     constructor(private readonly userDatasource: UserDatasource) { }

     addUser(addUserDto: AddUserDto): Promise<AddUserEntity> {
          return this.userDatasource.addUser(addUserDto);
     }

     updateUser(updateUserDto: UpdateUserDto): Promise<UpdateUserEntity> {
          return this.userDatasource.updateUser(updateUserDto);
     }

     deleteUser(deleteUserDto: DeleteUserDto): Promise<DeleteUserEntity> {
          return this.userDatasource.deleteUser(deleteUserDto);
     }

     getUsers(): Promise<GetUsersEntity> {
          return this.userDatasource.getUsers();
     }

}
