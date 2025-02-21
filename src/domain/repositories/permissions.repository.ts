import { AddPermissionsDto, DeletePermissionsDto, GetPermissionsDto } from "../dtos/permissions";
import { AddPermissionsEntity, DeletePermissionsEntity, GetPermissionsEntity } from "../entities";

export abstract class PermissionsRepository {

     abstract addPermissions(addPermissionsDto: AddPermissionsDto): Promise<AddPermissionsEntity>
     abstract deletePermissions(deletePermissionsDto: DeletePermissionsDto): Promise<DeletePermissionsEntity>
     abstract getPermissions(): Promise<GetPermissionsEntity>

}