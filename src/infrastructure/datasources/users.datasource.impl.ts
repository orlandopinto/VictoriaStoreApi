import { AddUserDto } from "../../domain/dtos/users/add-user.dto";
import { DeleteUserDto } from "../../domain/dtos/users/delete-user.dto";
import { UpdateUserDto } from "../../domain/dtos/users/update-user.dto";
import { AppLogger } from "../../config/appLogger";
import { UsersModel, usersSchema } from "../../data/mongodb/models/users.model";
import { AddUserEntity, DeleteUserEntity, GetUsersEntity, UpdateUserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";
import { UserDatasource } from "../../domain/datasources/user.datasource";

export class UserDatasourceImpl implements UserDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("UserDatasourceImpl");
     }

     async addUser(addUserDto: AddUserDto): Promise<AddUserEntity> {

          const { _id, userName, email, password, firstName, lastName, phoneNumber, mobileNumber, birthday, public_id, secure_url, emailVerified, gender, shippingAddresses, wishList } = addUserDto;

          try {

               const user = await UsersModel.findOne({ email: email })
               if (user) throw CustomError.badRequest('User already exists.')
               const result = await UsersModel.create({ _id, userName, email, password, firstName, lastName, phoneNumber, mobileNumber, birthday, public_id, secure_url, emailVerified, gender, shippingAddresses, wishList })
               await result.save();
               return new AddUserEntity(result._id.toString(), result.userName, result.email, result.password, result.firstName, result.lastName, result.phoneNumber, result.mobileNumber, result.birthday, result.public_id && result.public_id.toString(), result.secure_url && result.secure_url.toString(), result.emailVerified, result.gender, result.shippingAddresses && null, result.wishList && null);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async updateUser(updateUserDto: UpdateUserDto): Promise<UpdateUserEntity> {
          const { _id, userName, email, password, firstName, lastName, phoneNumber, mobileNumber, birthday, public_id, secure_url, emailVerified, gender, shippingAddresses, wishList } = updateUserDto;
          try {
               const result = await UsersModel.findByIdAndUpdate(
                    _id,
                    {
                         _id, userName, email, password, firstName, lastName, phoneNumber, mobileNumber, birthday, public_id, secure_url, emailVerified, gender, shippingAddresses, wishList
                    },
                    { new: true });

               if (!result)
                    throw CustomError.notFound('User not found.');

               return new UpdateUserEntity(result._id.toString(), result.userName, result.email, result.password, result.firstName, result.lastName, result.phoneNumber, result.mobileNumber, result.birthday, result.public_id && result.public_id.toString(), result.secure_url && result.secure_url.toString(), result.emailVerified, result.gender, result.shippingAddresses && null, result.wishList && null, result.createdAt as unknown as string, result.updatedAt as unknown as string);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async deleteUser(deleteUserDto: DeleteUserDto): Promise<DeleteUserEntity> {

          const { email } = deleteUserDto;
          try {
               const user = await UsersModel.findOne({ email: email })
               if (!user) throw CustomError.badRequest("User does not exist or has been deleted.")
               await UsersModel.deleteOne({ email: email })
               return new DeleteUserEntity(user.email);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getUsers(): Promise<GetUsersEntity> {
          try {
               const result = await UsersModel.find() as unknown as [typeof usersSchema][]
               return new GetUsersEntity(result);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}
