import { AuthorizationModel } from "../../data/mongodb";
import { AuthorizationDatasource } from "../../domain/datasources";
import { AddAuthorizationDto, DeleteAuthorizationDto } from "../../domain/dtos/roles-permissions";
import { GetAuthorizationEntity } from "../../domain/entities";
import { AuthorizationMapper } from "../mappers";

export class AuthorizationDatasourceImpl implements AuthorizationDatasource {

     async addAuthorization(addAuthorizationDto: AddAuthorizationDto): Promise<any> {
          let { id, roleId, resourseId, actionId, hasError, message } = addAuthorizationDto;
          hasError = false;
          try {
               // 1. Crear el authorization
               try {
                    if (!roleId) {
                         hasError = true;
                         message = 'Missing role ID'
                    }
                    if (!resourseId) {
                         hasError = true;
                         message = 'Missing resourse ID'
                    }
                    if (!actionId) {
                         hasError = true;
                         message = 'Missing action ID'
                    }

                    if (roleId && resourseId && actionId) {
                         const authorization = await AuthorizationModel.create({ roleId, resourseId, actionId, hasError, message })
                         await authorization.save();
                         id = authorization._id.toString()
                         return AuthorizationMapper.addAuthorizationEntityFromObject({ id, roleId, resourseId, actionId, hasError, message });
                    }
               } catch (error) {
                    hasError = true
                    message = (error as any).errmsg
               }

               // 2. Mapear la respuesta a la entidad
               return AuthorizationMapper.addAuthorizationEntityFromObject({ id, roleId, resourseId, actionId, hasError, message });

          } catch (error) {
               throw error;
          }
     }

     async deleteAuthorization(deleteAuthorizationDto: DeleteAuthorizationDto): Promise<any> {
          let { id, hasError, message } = deleteAuthorizationDto;
          hasError = true;
          message = "id doesn't exists. [0] records deleted"
          try {
               if (!id) {
                    hasError = true;
                    message = 'Missing ID'
               }
               // 1. eliminar el authorization
               if (id) {
                    const result = await AuthorizationModel.deleteOne({ _id: id });
                    if (result.deletedCount > 0) {
                         hasError = false;
                         message = `[${result.deletedCount}] records deleted successfully.`;
                    }

                    // 2. Mapear la respuesta a la entidad
                    return AuthorizationMapper.deleteAuthorizationEntityFromObject({ id, hasError, message });
               }

          } catch (error) {
               throw error;
          }
          return AuthorizationMapper.deleteAuthorizationEntityFromObject({ id, hasError, message });
     }

     async getAuthorizations(): Promise<GetAuthorizationEntity> {
          try {
               // 1. listar
               const result = await AuthorizationModel.find()
               // 2. Mapear la respuesta a la entidad
               return AuthorizationMapper.getAuthorizationListEntityFromObject({ authorization: result, message: undefined });

          } catch (error) {
               throw error;
          }
     }

}