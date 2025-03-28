
export class DeleteShippingAddressDto {

     constructor(
          public _id: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteShippingAddressDto?] {

          const { _id } = object;

          if (_id === undefined) return ['Missing _id on delete ShippingAddress']

          return [
               undefined,
               new DeleteShippingAddressDto(_id)
          ];
     }

}
