
export class ChangePasswordDto {
     constructor(
          public email: string,
          public newPassword: string
     ) { }

     static change(object: { [key: string]: any }): [string?, ChangePasswordDto?] {
          let { email, newPassword } = object;
          if (email === undefined) return ['Missing email on change password']
          if (newPassword === undefined) return ['Missing newPassword on change password']
          return [
               undefined,
               new ChangePasswordDto(email, newPassword)
          ];
     }

}
