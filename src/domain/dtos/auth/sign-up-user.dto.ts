
export class SignUpUserDto {

     private constructor(
          public email: string,
          public password: string,
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
          public roles?: string[]
     ) { }

     static create(object: { [key: string]: any }): [string?, SignUpUserDto?] {
          const { email, password, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles } = object;

          return [
               undefined,
               new SignUpUserDto(email, password, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles)
          ];
     }
}