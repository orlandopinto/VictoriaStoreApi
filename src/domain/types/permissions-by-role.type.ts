export type Role = {
     id?: string,
     roleName: string,
     roleDescription?: string
}

export type ActionsSelected = {
     id: string
     actionId: string
     actionName: string
     resourseId: string
     resourseName: string
     roleId: string | null
     roleName: string | null
}

export type UsersByRole = {
     email: string,
     firstName: string,
     lastName: string,
     imageProfilePath?: string
}

export type PermissionsByRole = {
     role: Role;
     actionListSelected: ActionsSelected[];
     usersByRole: UsersByRole[]
}