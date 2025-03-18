
export class SignInUserDto {
     constructor(
          public accessToken: string,
          public refreshToken: string,
          public email: string,
          public password: string
     ) { }

     static signIn(object: { [key: string]: any }): [string?, SignInUserDto?] {
          let { accessToken, refreshToken, email, password } = object;
          return [
               undefined,
               new SignInUserDto(accessToken, refreshToken, email, password)
          ];
     }

}
