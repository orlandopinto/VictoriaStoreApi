import { accessSchema } from '../../data/mongodb/models/access.model';

export type UserToken = {
     token: string;
     user: {
          id: string;
          name: string;
          email: string;
     }
}

//WARNING: Modificar la estructura que se necesita al hacer login
export type SystemUserToken = {
     token: string;
     user: {
          id: string,
          email: string,
          password: string,
          address?: String,
          firstName?: string,
          lastName?: string,
          phoneNumber?: string,
          imageProfilePath?: string,
          city?: string,
          zipcode?: Number,
          lockoutEnabled?: Boolean,
          accessFailedCount?: Number,
          birthDate?: Date,
          roles?: string[],
          permissionsByUser?: [typeof accessSchema][]
     }
}
/*

export type EnviromentData = {
     user: User,
     access: Access[],
     roles: Roles[],
     resourses: Resourses[],
     actions: Actions[],

}







*/