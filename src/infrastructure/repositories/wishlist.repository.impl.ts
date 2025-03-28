import { WishListDatasource } from "../../domain/datasources";
import { AddWishListDto } from "../../domain/dtos/wishlists/add-wishlist.dto";
import { DeleteWishListDto } from "../../domain/dtos/wishlists/delete-wishlist.dto";
import { UpdateWishListDto } from "../../domain/dtos/wishlists/update-wishlist.dto";
import { AddWishListEntity, DeleteWishListEntity, GetWishListsEntity, UpdateWishListEntity } from "../../domain/entities/wishlist.entity";
import { WishListRepository } from "../../domain/repositories";

export class WishListRepositoryImpl implements WishListRepository {

     constructor(private readonly wishlistDatasource: WishListDatasource) { }

     addWishList(addWishListDto: AddWishListDto): Promise<AddWishListEntity> {
          return this.wishlistDatasource.addWishList(addWishListDto);
     }

     updateWishList(updateWishListDto: UpdateWishListDto): Promise<UpdateWishListEntity> {
          return this.wishlistDatasource.updateWishList(updateWishListDto);
     }

     deleteWishList(deleteWishListDto: DeleteWishListDto): Promise<DeleteWishListEntity> {
          return this.wishlistDatasource.deleteWishList(deleteWishListDto);
     }

     getWishLists(): Promise<GetWishListsEntity> {
          return this.wishlistDatasource.getWishLists();
     }

}
