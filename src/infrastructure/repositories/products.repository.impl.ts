import { ProductDatasource } from "../../domain/datasources";
import { AddProductDto, DeleteProductDto, UpdateProductDto } from "../../domain/dtos/products";

import { AddProductEntity, DeleteProductEntity, GetProductsEntity, UpdateProductEntity } from "../../domain/entities";
import { ProductRepository } from "../../domain/repositories";

export class ProductRepositoryImpl implements ProductRepository {

     constructor(private readonly productDatasource: ProductDatasource) { }

     addProduct(addProductDto: AddProductDto): Promise<AddProductEntity> {
          return this.productDatasource.addProduct(addProductDto);
     }

     updateProduct(updateProductDto: UpdateProductDto): Promise<UpdateProductEntity> {
          return this.productDatasource.updateProduct(updateProductDto);
     }

     deleteProduct(deleteProductDto: DeleteProductDto): Promise<DeleteProductEntity> {
          return this.productDatasource.deleteProduct(deleteProductDto);
     }

     getProducts(): Promise<GetProductsEntity> {
          return this.productDatasource.getProducts();
     }

}
