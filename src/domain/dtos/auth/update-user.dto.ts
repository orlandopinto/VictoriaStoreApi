export class UpdateUserDto {

     private constructor(
          public id: string,
          public address: string,
          public firstName: string,
          public lastName: string,
          public phoneNumber: string,
          public imageProfilePath: string,
          public city: string,
          public zipcode: number,
          public lockoutEnabled: boolean,
          public accessFailedCount: number,
          public birthDate: Date,
          public roles?: string[],
          public isActive?: boolean
     ) { }

     static create(object: { [key: string]: any }): [string?, UpdateUserDto?] {
          const requiredFields = ['id', 'address', 'firstName', 'lastName', 'phoneNumber', 'imageProfilePath', 'city', 'zipcode', 'lockoutEnabled', 'accessFailedCount', 'birthDate'];
          for (const field of requiredFields) {
               if (object[field] === undefined) return [`Missing ${field} on update user`];
          }

          return [
               undefined,
               new UpdateUserDto(
                    object.id,
                    object.address,
                    object.firstName,
                    object.lastName,
                    object.phoneNumber,
                    object.imageProfilePath,
                    object.city,
                    object.zipcode,
                    object.lockoutEnabled,
                    object.accessFailedCount,
                    object.birthDate,
                    object.roles,
                    object.isActive
               )
          ];
     }
}