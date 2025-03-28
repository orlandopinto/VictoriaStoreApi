import { AddWishListDto } from "../../domain/dtos/wishlists/add-wishlist.dto";
import { DeleteWishListDto } from "../../domain/dtos/wishlists/delete-wishlist.dto";
import { UpdateWishListDto } from "../../domain/dtos/wishlists/update-wishlist.dto";

import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddWishListUseCase {
     execute(addWishListDto: AddWishListDto): Promise<ApiResultResponse>
}

export interface UpdateWishListUseCase {
     execute(updateWishListDto: UpdateWishListDto): Promise<ApiResultResponse>
}

export interface DeleteWishListUseCase {
     execute(deleteWishListDto: DeleteWishListDto): Promise<ApiResultResponse>
}

export interface GetWishListsUseCase {
     execute(): Promise<ApiResultResponse>
}
