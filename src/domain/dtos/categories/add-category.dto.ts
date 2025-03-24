
export class AddCategoryDto {
     constructor(
          public _id: string,
          public categoryName: string,
          public slug: string,
          public categoryDescription: string,
          public public_id: string,
          public secure_url: string
     ) { }


     static create(object: { [key: string]: any }): [string?, AddCategoryDto?] {

          const { _id, categoryName, slug, categoryDescription, public_id, secure_url } = object;

          if (categoryName === undefined) return ['Missing Category name on create category']
          if (slug === undefined) return ['Missing slug on create category']
          if (categoryDescription === undefined) return ['Missing category description on create category']
          if (public_id === undefined) return ['Missing public_id on create category']
          if (secure_url === undefined) return ['Missing secure_url on create category']

          return [
               undefined,
               new AddCategoryDto(_id, categoryName, slug, categoryDescription, public_id, secure_url)
          ];
     }

}