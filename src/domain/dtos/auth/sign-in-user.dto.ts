import { userData } from "../../types/index";

export class SignInUserDto {
     constructor(
          public token: string,
          public email: string,
          public password: string,
          public userData: userData,
          public hasError: boolean,
          public errorMessages?: string[]
     ) { }

     static signIn(object: { [key: string]: any }): [string?, SignInUserDto?] {
          let { token, email, password, userData, hasError, errorMessages } = object;
          return [
               undefined,
               new SignInUserDto(token, email, password, userData, hasError, errorMessages)
          ];
     }

}
