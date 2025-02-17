import { accessSchema } from "../../data/mongodb";

export type SystemUser = {
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

export type EnvironmentSystemUser = {
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