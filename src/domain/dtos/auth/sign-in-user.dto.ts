import { userData } from "../../types/index";

export class SignInUserDto {
     constructor(
          public token: string,
          public email: string,
          public password: string
     ) { }

     static signIn(object: { [key: string]: any }): [string?, SignInUserDto?] {
          let { token, email, password } = object;
          return [
               undefined,
               new SignInUserDto(token, email, password)
          ];
     }

}
