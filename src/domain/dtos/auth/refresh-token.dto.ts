
export class RefreshTokenDto {
     constructor(
          public email: string,
          public refreshToken: string,
     ) { }

     static refresh(object: { [key: string]: any }): [string?, RefreshTokenDto?] {
          let { email, refreshToken } = object;
          return [
               undefined,
               new RefreshTokenDto(email, refreshToken)
          ];
     }

}
