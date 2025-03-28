export class UpdateSystemUserDto {

     private constructor(
          public id: string,
          public address: string,
          public firstName: string,
          public lastName: string,
          public phoneNumber: string,
          public public_id: string,
          public secure_url: string,
          public city: string,
          public zipcode: number,
          public lockoutEnabled: boolean,
          public accessFailedCount: number,
          public birthDate: Date,
          public roles?: string[],
          public isActive?: boolean
     ) { }

     static create(object: { [key: string]: any }): [string?, UpdateSystemUserDto?] {
          const requiredFields = ['id', 'address', 'firstName', 'lastName', 'phoneNumber', 'public_id', 'secure_url', 'city', 'zipcode', 'lockoutEnabled', 'accessFailedCount', 'birthDate'];
          for (const field of requiredFields) {
               if (object[field] === undefined) return [`Missing ${field} on update user`];
          }

          return [
               undefined,
               new UpdateSystemUserDto(
                    object.id,
                    object.address,
                    object.firstName,
                    object.lastName,
                    object.phoneNumber,
                    object.public_id,
                    object.secure_url,
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