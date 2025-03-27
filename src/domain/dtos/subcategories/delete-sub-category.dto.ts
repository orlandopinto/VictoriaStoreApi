
export class DeleteSubCategoryDto {

     constructor(
          public _id: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteSubCategoryDto?] {

          const { _id } = object;

          if (_id === undefined) return ['Missing _id on delete sub category']

          return [
               undefined,
               new DeleteSubCategoryDto(_id)
          ];
     }

}