import { AddPermissionsDto, DeletePermissionsDto, GetPermissionsDto } from "../dtos/roles-permissions";
import { AddPermissionsEntity, DeletePermissionsEntity, GetPermissionsEntity } from "../entities";

export abstract class PermissionsRepository {

     abstract addPermissions(addPermissionsDto: AddPermissionsDto): Promise<AddPermissionsEntity>
     abstract deletePermissions(deletePermissionsDto: DeletePermissionsDto): Promise<DeletePermissionsEntity>
     abstract getPermissions(getPermissionsDto: GetPermissionsDto): Promise<GetPermissionsEntity>

}