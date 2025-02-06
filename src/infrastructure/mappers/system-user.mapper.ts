import { CustomError } from "../../domain";
import { SystemUserEntity } from "../../domain/entities/system-user.entity";

export class SystemUserMapper {

     static systemUserEntityFromObject(object: { [key: string]: any }) {

          const { _id, id, userName, email, password } = object
          // ********* VALIDAR TODOS LOS CAMPOS QUE SON OBLIGATORIOS ********* 

          if (!userName) throw CustomError.badRequest('Missing user name')
          if (!email) throw CustomError.badRequest('Missing email')
          if (!password) throw CustomError.badRequest('Missing password')

          // ********************** FIN DE LA VALIDACIÓN *********************
          return new SystemUserEntity(_id || id, userName, email, password);
     }

}