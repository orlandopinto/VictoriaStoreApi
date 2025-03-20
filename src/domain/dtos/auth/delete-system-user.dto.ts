
export class DeleteSystemUserDto {
     constructor(
          public _id: string,
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteSystemUserDto?] {
          const { _id } = object;

          if (_id === undefined) return ['Missing _id on delete user']

          return [
               undefined,
               new DeleteSystemUserDto(_id)
          ];
     }

}