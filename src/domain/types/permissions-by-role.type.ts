import { permissionsActionsSchema } from "../../data/mongodb"

export type PermissionByRoles = {
     permissionId: string,
     roleName: string,
     resourseName: string,
     permissionActionsIds: [typeof permissionsActionsSchema]
}