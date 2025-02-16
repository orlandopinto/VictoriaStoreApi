import { AddAuthorizationEntity, DeleteAuthorizationEntity, GetAuthorizationEntity } from "../../domain/entities";

export class AuthorizationMapper {

     static addAuthorizationEntityFromObject(object: { [key: string]: any }) {

          const { id, _id, roleId, resourseId, actionId, hasError, message } = object

          // ********* VALIDAR TODOS LOS CAMPOS QUE SON OBLIGATORIOS ********* 

          // if (!roleId) return ['Missing role ID']
          // if (!resourseId) return ['Missing resourse ID']
          // if (!actionId) return ['Missing action ID']

          // ********************** FIN DE LA VALIDACIÓN *********************
          return new AddAuthorizationEntity(_id || id, roleId, resourseId, actionId, hasError, message);
     }

     static deleteAuthorizationEntityFromObject(object: { [key: string]: any }) {

          let { id, hasError, message } = object

          // if (!id) {
          //      hasError = true;
          //      message = 'Missing ID'
          //      throw new Error('Missing ID')
          // }
          return new DeleteAuthorizationEntity(id, hasError, message);
     }

     static getAuthorizationListEntityFromObject(object: { [key: string]: any }) {
          const { authorization, hasError, message } = object
          return new GetAuthorizationEntity(authorization, hasError, message);

     }

}