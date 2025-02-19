import { AddPermissionsDto, DeletePermissionsDto, GetPermissionsDto } from "../dtos/permissions/index";
import { AddPermissionsEntity, DeletePermissionsEntity, GetPermissionsEntity } from "../entities";

export abstract class PermissionsDatasource {

     //TODO: Modificar addPermissions y getPermissions, para que devuelva
     abstract addPermissions(addPermissionsDto: AddPermissionsDto): Promise<AddPermissionsEntity>
     abstract deletePermissions(deletePermissionsDto: DeletePermissionsDto): Promise<DeletePermissionsEntity>
     abstract getPermissions(getPermissionsDto: GetPermissionsDto): Promise<GetPermissionsEntity>

}