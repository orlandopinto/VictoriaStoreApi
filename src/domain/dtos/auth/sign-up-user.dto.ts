
export class SignUpUserDto {

     private constructor(
          public email: string,
          public password: string,
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

     static create(object: { [key: string]: any }): [string?, SignUpUserDto?] {
          const { email, password, address, firstName, lastName, phoneNumber, public_id, secure_url, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, isActive } = object;

          if (email === undefined) return ['Missing email on register user']
          if (password === undefined) return ['Missing password on register user']
          if (firstName === undefined) return ['Missing firstName on register user']
          if (lastName === undefined) return ['Missing lastName on register user']
          if (phoneNumber === undefined) return ['Missing phoneNumber on register user']
          if (public_id === undefined) return ['Missing public_id on register user']
          if (secure_url === undefined) return ['Missing secure_url on register user']
          if (roles === undefined) return ['Missing roles on register user']
          if (isActive === undefined) return ['Missing isActive on register user']

          return [
               undefined,
               new SignUpUserDto(email, password, address, firstName, lastName, phoneNumber, public_id, secure_url, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, isActive)
          ];
     }
}