
export class DeleteRatingDto {

     constructor(
          public _id: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteRatingDto?] {

          const { _id } = object;

          if (_id === undefined) return ['Missing _id on delete Rating']

          return [
               undefined,
               new DeleteRatingDto(_id)
          ];
     }

}
