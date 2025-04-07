import { ProductImageDatasource } from "../../domain/datasources";
import { AddProductImageDto } from "../../domain/dtos/productImages/add-product-image.dto";
import { DeleteProductImageDto } from "../../domain/dtos/productImages/delete-product-image.dto";
import { AddProductImageEntity, DeleteProductImageEntity, GetProductImagesEntity } from "../../domain/entities";

import { ProductImageRepository } from "../../domain/repositories";

export class ProductImageRepositoryImpl implements ProductImageRepository {

     constructor(private readonly productimageDatasource: ProductImageDatasource) { }

     addProductImage(addProductImageDto: AddProductImageDto): Promise<AddProductImageEntity> {
          return this.productimageDatasource.addProductImage(addProductImageDto);
     }

     deleteProductImage(deleteProductImageDto: DeleteProductImageDto): Promise<DeleteProductImageEntity> {
          return this.productimageDatasource.deleteProductImage(deleteProductImageDto);
     }

     getProductImages(): Promise<GetProductImagesEntity> {
          return this.productimageDatasource.getProductImages();
     }

}
