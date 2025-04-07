
export class DeleteReviewDto {

     constructor(
          public _id: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteReviewDto?] {

          const { _id } = object;

          if (_id === undefined) return ['Missing _id on delete Review']

          return [
               undefined,
               new DeleteReviewDto(_id)
          ];
     }

}
