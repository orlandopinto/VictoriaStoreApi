import { PermissionsDatasource } from "../../domain/datasources";
import { AddPermissionsDto, DeletePermissionsDto, GetPermissionsDto } from "../../domain/dtos/permissions";
import { AddPermissionsEntity, DeletePermissionsEntity, GetPermissionsEntity } from "../../domain/entities";
import { PermissionsRepository } from "../../domain/repositories";

export class PermissionsRepositoryImpl implements PermissionsRepository {

     constructor(private readonly permissionsDatasource: PermissionsDatasource) { }

     addPermissions(addPermissionsDto: AddPermissionsDto): Promise<AddPermissionsEntity> {
          return this.permissionsDatasource.addPermissions(addPermissionsDto);
     }

     deletePermissions(deletePermissionsDto: DeletePermissionsDto): Promise<DeletePermissionsEntity> {
          return this.permissionsDatasource.deletePermissions(deletePermissionsDto);
     }

     getPermissions(getPermissionsDto: GetPermissionsDto): Promise<GetPermissionsEntity> {
          return this.permissionsDatasource.getPermissions(getPermissionsDto);
     }

}