import { SystemUserEntity } from "../../domain/entities/system-user.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class SystemUserMapper {

     static systemUserEntityFromObject(object: { [key: string]: any }) {

          const { _id, id, email, password, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, permissionsByUser } = object
          // ********* VALIDAR TODOS LOS CAMPOS QUE SON OBLIGATORIOS ********* 

          if (!email) throw CustomError.badRequest('Missing email')
          if (!password) throw CustomError.badRequest('Missing password')

          // ********************** FIN DE LA VALIDACIÓN *********************
          return new SystemUserEntity(_id || id, email, password, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, permissionsByUser);
     }

}