import { Validators } from "../../../config";

export class SignInUserDto {
     constructor(
          public email: string,
          public password: string
     ) { }

     //primer argumento es el mensaje de error y el segundo argumento va a ser la instancia de DTO
     //nota lo de abajo es una Tupla
     static signIn(object: { [key: string]: any }): [string?, SignInUserDto?] {
          const { email, password } = object;
          if (!email) return ['Missing email']
          if (!password) return ['Missing password']
          if (!Validators.email.test(email)) return ['Email is not valid']

          return [
               undefined,
               new SignInUserDto(email, password)
          ];
     }

}
