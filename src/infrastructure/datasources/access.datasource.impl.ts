import { AccessModel } from "../../data/mongodb";
import { AccessDatasource } from "../../domain/datasources";
import { AddAccessDto, DeleteAccessDto } from "../../domain/dtos/roles-permissions";
import { GetAccessEntity } from "../../domain/entities";
import { AccessMapper } from "../mappers";

export class AccessDatasourceImpl implements AccessDatasource {

     async addAccess(addAccessDto: AddAccessDto): Promise<any> {
          let { id, roleId, resourseId, actionId, hasError, message } = addAccessDto;
          hasError = false;
          try {
               // 1. Crear el access
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
                         const access = await AccessModel.create({ roleId, resourseId, actionId, hasError, message })
                         await access.save();
                         id = access._id.toString()
                         return AccessMapper.addAccessEntityFromObject({ id, roleId, resourseId, actionId, hasError, message });
                    }
               } catch (error) {
                    hasError = true
                    message = (error as any).errmsg
               }

               // 2. Mapear la respuesta a la entidad
               return AccessMapper.addAccessEntityFromObject({ id, roleId, resourseId, actionId, hasError, message });

          } catch (error) {
               throw error;
          }
     }

     async deleteAccess(deleteAccessDto: DeleteAccessDto): Promise<any> {
          let { id, hasError, message } = deleteAccessDto;
          hasError = true;
          message = "id doesn't exists. [0] records deleted"
          try {
               if (!id) {
                    hasError = true;
                    message = 'Missing ID'
               }
               // 1. eliminar el access
               if (id) {
                    const result = await AccessModel.deleteOne({ _id: id });
                    if (result.deletedCount > 0) {
                         hasError = false;
                         message = `[${result.deletedCount}] records deleted successfully.`;
                    }

                    // 2. Mapear la respuesta a la entidad
                    return AccessMapper.deleteAccessEntityFromObject({ id, hasError, message });
               }

          } catch (error) {
               throw error;
          }
          return AccessMapper.deleteAccessEntityFromObject({ id, hasError, message });
     }

     async getAccesss(): Promise<GetAccessEntity> {
          try {
               // 1. listar
               const result = await AccessModel.find()
               // 2. Mapear la respuesta a la entidad
               return AccessMapper.getAccessListEntityFromObject({ access: result, message: undefined });

          } catch (error) {
               throw error;
          }
     }

}