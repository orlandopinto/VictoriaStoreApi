import { AddProductImageDto } from "../dtos/productImages/add-product-image.dto";
import { DeleteProductImageDto } from "../dtos/productImages/delete-product-image.dto";
import { AddProductImageEntity, DeleteProductImageEntity, GetProductImagesEntity } from "../entities";

export abstract class ProductImageRepository {

     abstract addProductImage(addProductImageDto: AddProductImageDto): Promise<AddProductImageEntity>
     abstract deleteProductImage(deleteProductImageDto: DeleteProductImageDto): Promise<DeleteProductImageEntity>
     abstract getProductImages(): Promise<GetProductImagesEntity>

}
