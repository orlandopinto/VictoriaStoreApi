import { CustomError } from "../../errors/custom.error";
import { GetWishListsUseCase } from "../../interfaces/IWishList";
import { WishListRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetWishLists implements GetWishListsUseCase {

     constructor(private readonly wishlistRepository: WishListRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const wishlists = await this.wishlistRepository.getWishLists();
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: wishlists,
                    message: null,
                    statusCode: 200,
                    stackTrace: null
               }
          } catch (error) {
               const err = error as Error
               let statusCode: number = 500;
               if (error instanceof CustomError) {
                    statusCode = error.statusCode;
               }
               resultResponse = {
                    status: "error",
                    hasError: true,
                    data: null,
                    message: err.message,
                    statusCode: statusCode,
                    stackTrace: err.stack
               }
          }
          return resultResponse;
     }
}
