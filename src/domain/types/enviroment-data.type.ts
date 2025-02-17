import { Access } from './access.type';
import { Actions } from './actions.type';
import { Resourses } from './resourses.type';
import { Roles } from './roles.type';
import { EnvironmentSystemUser } from './system-user.type';

export type EnviromentData = {
     email?: string,
     password?: string,
     user: EnvironmentSystemUser,
     access: Access[],
     roles: Roles[],
     resourses: Resourses[],
     actions: Actions[]
}