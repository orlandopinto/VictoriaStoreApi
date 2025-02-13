import { UserEntity } from "../../domain/entities"
import { CustomError } from "../../domain/errors/custom.error"

export class UserMapper {

     static userEntityFromObject(object: { [key: string]: any }) {

          const { id, _id, name, email, password, img, roles } = object
          // ********* VALIDAR TODOS LOS CAMPOS QUE SON OBLIGATORIOS ********* 

          if (!name) throw CustomError.badRequest('Missing name')
          if (!email) throw CustomError.badRequest('Missing ')
          if (!password) throw CustomError.badRequest('Missing password')
          if (!roles) throw CustomError.badRequest('Missing roles')

          // ********************** FIN DE LA VALIDACIÓN *********************
          return new UserEntity(_id || id, name, email, password, img, roles);
     }

}