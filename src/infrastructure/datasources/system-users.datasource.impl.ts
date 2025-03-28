import { AppLogger } from "../../config/appLogger";
import { SystemUsersModel, systemUsersSchema } from "../../data/mongodb";
import { SystemUserDatasource } from "../../domain/datasources";
import { AddSystemUserDto } from "../../domain/dtos/systemusers/add-system-user.dto";
import { DeleteSystemUserDto } from "../../domain/dtos/systemusers/delete-system-user.dto";
import { UpdateSystemUserDto } from "../../domain/dtos/systemusers/update-system-user.dto";
import { AddSystemUserEntity, UpdateSystemUserEntity, DeleteSystemUserEntity, GetSystemUsersEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class SystemUserDatasourceImpl implements SystemUserDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("SystemUserDatasourceImpl");
     }

     async addSystemUser(addSystemUserDto: AddSystemUserDto): Promise<AddSystemUserEntity> {

          const { _id, email, password, firstName, lastName, phoneNumber, public_id, secure_url, city, zipcode, lockoutEnabled, accessFailedCount, address, birthDate, roles, isActive } = addSystemUserDto;

          try {

               const systemuser = await SystemUsersModel.findOne({ email: email })
               if (systemuser) throw CustomError.badRequest('SystemUser already exists.')
               const result = await SystemUsersModel.create({ _id, email, password, firstName, lastName, phoneNumber, public_id, secure_url, city, zipcode, lockoutEnabled, accessFailedCount, address, birthDate, roles, isActive })
               await result.save();
               return new AddSystemUserEntity(result._id.toString(), result.email, result.password, result.firstName, result.lastName, result.phoneNumber, result.public_id, result.secure_url, result.city, result.zipcode, result.lockoutEnabled, result.accessFailedCount, result.address, result.birthDate, result.roles, result.isActive);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async updateSystemUser(updateSystemUserDto: UpdateSystemUserDto): Promise<UpdateSystemUserEntity> {
          const { _id, email, password, firstName, lastName, phoneNumber, public_id, secure_url, city, zipcode, lockoutEnabled, accessFailedCount, address, birthDate, roles, isActive } = updateSystemUserDto;
          try {
               const result = await SystemUsersModel.findByIdAndUpdate(
                    _id,
                    {
                         _id, email, password, firstName, lastName, phoneNumber, public_id, secure_url, city, zipcode, lockoutEnabled, accessFailedCount, address, birthDate, roles, isActive
                    },
                    { new: true });

               if (!result)
                    throw CustomError.notFound('SystemUser not found.');

               return new UpdateSystemUserEntity(result._id.toString(), result.email, result.password, result.firstName, result.lastName, result.phoneNumber, result.public_id, result.secure_url, result.city, result.zipcode, result.lockoutEnabled, result.accessFailedCount, result.address, result.birthDate, result.roles, result.isActive,);
               //Agregar si es necesario result.createdAt as unknown as string, result.updatedAt as unknown as string);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async deleteSystemUser(deleteSystemUserDto: DeleteSystemUserDto): Promise<DeleteSystemUserEntity> {

          const { email } = deleteSystemUserDto;
          try {
               const systemuser = await SystemUsersModel.findOne({ email: email })
               if (!systemuser) throw CustomError.badRequest("SystemUser does not exist or has been deleted.")
               await SystemUsersModel.deleteOne({ email: email })
               //NOTE: Corregir la siguiente linea
               return new DeleteSystemUserEntity(email);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getSystemUsers(): Promise<GetSystemUsersEntity> {
          try {
               const systemUsers = await SystemUsersModel.find() as unknown as [typeof systemUsersSchema][]
               return new GetSystemUsersEntity(systemUsers);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}
