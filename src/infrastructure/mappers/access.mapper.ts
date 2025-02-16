import { AddAccessEntity, DeleteAccessEntity, GetAccessEntity } from "../../domain/entities";

export class AccessMapper {

     static addAccessEntityFromObject(object: { [key: string]: any }) {

          const { id, _id, roleId, resourseId, actionId, hasError, message } = object

          // ********* VALIDAR TODOS LOS CAMPOS QUE SON OBLIGATORIOS ********* 

          // if (!roleId) return ['Missing role ID']
          // if (!resourseId) return ['Missing resourse ID']
          // if (!actionId) return ['Missing action ID']

          // ********************** FIN DE LA VALIDACIÓN *********************
          return new AddAccessEntity(_id || id, roleId, resourseId, actionId, hasError, message);
     }

     static deleteAccessEntityFromObject(object: { [key: string]: any }) {

          let { id, hasError, message } = object

          // if (!id) {
          //      hasError = true;
          //      message = 'Missing ID'
          //      throw new Error('Missing ID')
          // }
          return new DeleteAccessEntity(id, hasError, message);
     }

     static getAccessListEntityFromObject(object: { [key: string]: any }) {
          const { access, hasError, message } = object
          return new GetAccessEntity(access, hasError, message);

     }

}