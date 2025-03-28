
export class AddWishListDto {
    constructor(
        
	 public _id: string,
	 public user_Id: string,
	 public product_id: string

    ) { }

    static create(object: { [key: string]: any }): [string ?, AddWishListDto?] {
        const { _id, user_Id, product_id  } = object;

        	 if (_id  === undefined) return ['Missing _id on create wishlist'];
	 if (user_Id  === undefined) return ['Missing user_Id on create wishlist'];
	 if (product_id  === undefined) return ['Missing product_id on create wishlist'];

        return [
            undefined,
            new AddWishListDto(_id, user_Id, product_id )
        ];
    }
}
