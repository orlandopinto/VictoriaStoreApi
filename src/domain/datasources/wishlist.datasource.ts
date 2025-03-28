import { AddWishListDto } from "../../domain/dtos/wishlists/add-wishlist.dto";
import { DeleteWishListDto } from "../../domain/dtos/wishlists/delete-wishlist.dto";
import { UpdateWishListDto } from "../../domain/dtos/wishlists/update-wishlist.dto";

import { DeleteWishListEntity, GetWishListsEntity, AddWishListEntity, UpdateWishListEntity } from "../entities";

export abstract class WishListDatasource {

     abstract addWishList(addWishListDto: AddWishListDto): Promise<AddWishListEntity>
     abstract updateWishList(updateWishListDto: UpdateWishListDto): Promise<UpdateWishListEntity>
     abstract deleteWishList(deleteWishListDto: DeleteWishListDto): Promise<DeleteWishListEntity>
     abstract getWishLists(): Promise<GetWishListsEntity>

}
