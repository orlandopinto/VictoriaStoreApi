export type Role = {
     id?: string,
     roleName: string,
     roleDescription?: string
}

export type PermissionsByRole = {
     id: string
     actionId: string
     actionName: string
     pageId: string
     pageName: string
     roleId: string | null
     roleName: string | null
}

export type UsersByRole = {
     email: string,
     firstName: string,
     lastName: string,
     imageProfilePath?: string
}

export type PermissionsProfile = {
     role: Role;
     permissionsByRole: PermissionsByRole[];
     usersByRole: UsersByRole[]
}