import { DeleteRoleEntity, RolesEntity } from "../../domain/entities/roles.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class RoleMapper {

     static roleEntityFromObject(object: { [key: string]: any }) {

          const { id, _id, roleName } = object
          // ********* VALIDAR TODOS LOS CAMPOS QUE SON OBLIGATORIOS ********* 

          if (!roleName) throw CustomError.badRequest('Missing role name')

          // ********************** FIN DE LA VALIDACIÓN *********************
          return new RolesEntity(_id || id, roleName);
     }

     static deleteRoleEntityFromObject(object: { [key: string]: any }) {
          const { roleName, message } = object
          return new DeleteRoleEntity(roleName, message);
     }

}