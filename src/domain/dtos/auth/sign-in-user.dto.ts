import { EnviromentData } from "../../types/index";

export class SignInUserDto {
     constructor(
          public token: string,
          public email: string,
          public password: string,
          public EnviromentData: EnviromentData,
          public hasError: boolean,
          public errorMessages?: string[]
     ) { }

     static signIn(object: { [key: string]: any }): [string?, SignInUserDto?] {
          let { token, email, password, EnviromentData, hasError, errorMessages } = object;
          return [
               undefined,
               new SignInUserDto(token, email, password, EnviromentData, hasError, errorMessages)
          ];
     }

}
