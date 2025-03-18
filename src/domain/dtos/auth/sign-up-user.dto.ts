
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
          public roles?: string[],
          public isActive?: boolean
     ) { }

     static create(object: { [key: string]: any }): [string?, SignUpUserDto?] {
          const { email, password, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, isActive } = object;

          if (!email) return ['Missing email on register user']
          if (!password) return ['Missing password on register user']
          if (!firstName) return ['Missing firstName on register user']
          if (!lastName) return ['Missing lastName on register user']
          if (!phoneNumber) return ['Missing phoneNumber on register user']
          if (!imageProfilePath) return ['Missing imageProfilePath on register user']
          if (!roles) return ['Missing roles on register user']
          if (!isActive) return ['Missing isActive on register user']

          return [
               undefined,
               new SignUpUserDto(email, password, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, isActive)
          ];
     }
}