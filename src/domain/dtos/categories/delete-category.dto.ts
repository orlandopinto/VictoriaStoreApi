
export class DeleteCategoryDto {

     constructor(
          public _id: string,
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteCategoryDto?] {

          const { _id } = object;

          if (_id === undefined) return ['Missing _id on delete category']

          return [
               undefined,
               new DeleteCategoryDto(_id)
          ];
     }

}