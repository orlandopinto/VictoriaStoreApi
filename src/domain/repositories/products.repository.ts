import { AddProductDto, DeleteProductDto, UpdateProductDto } from "../dtos/products";
import { DeleteProductEntity, GetProductsEntity, AddProductEntity, UpdateProductEntity } from "../entities";

export abstract class ProductRepository {

     abstract addProduct(addProductDto: AddProductDto): Promise<AddProductEntity>
     abstract updateProduct(updateProduct: UpdateProductDto): Promise<UpdateProductEntity>
     abstract deleteProduct(deleteProductDto: DeleteProductDto): Promise<DeleteProductEntity>
     abstract getProducts(): Promise<GetProductsEntity>

}
