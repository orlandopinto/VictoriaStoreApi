import { AddProductVideoDto } from "../dtos/productVideos/add-product-video.dto";
import { DeleteProductVideoDto } from "../dtos/productVideos/delete-product-video.dto";
import { AddProductVideoEntity, DeleteProductVideoEntity, GetProductVideosEntity } from "../entities";

export abstract class ProductVideoRepository {

     abstract addProductVideo(addProductVideoDto: AddProductVideoDto): Promise<AddProductVideoEntity>
     abstract deleteProductVideo(deleteProductVideoDto: DeleteProductVideoDto): Promise<DeleteProductVideoEntity>
     abstract getProductVideos(): Promise<GetProductVideosEntity>

}
