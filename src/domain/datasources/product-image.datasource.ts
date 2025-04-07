
import { AddProductImageDto } from "../dtos/productImages/add-product-image.dto";
import { DeleteProductImageDto } from "../dtos/productImages/delete-product-image.dto";
import { DeleteProductImageEntity, GetProductImagesEntity, AddProductImageEntity, } from "../entities";

export abstract class ProductImageDatasource {

     abstract addProductImage(addProductImageDto: AddProductImageDto): Promise<AddProductImageEntity>
     abstract deleteProductImage(deleteProductImageDto: DeleteProductImageDto): Promise<DeleteProductImageEntity>
     abstract getProductImages(): Promise<GetProductImagesEntity>

}
