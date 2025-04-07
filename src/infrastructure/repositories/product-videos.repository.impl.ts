import { ProductVideoDatasource } from "../../domain/datasources";
import { AddProductVideoDto } from "../../domain/dtos/productVideos/add-product-video.dto";
import { DeleteProductVideoDto } from "../../domain/dtos/productVideos/delete-product-video.dto";
import { AddProductVideoEntity, DeleteProductVideoEntity, GetProductVideosEntity } from "../../domain/entities";

import { ProductVideoRepository } from "../../domain/repositories";

export class ProductVideoRepositoryImpl implements ProductVideoRepository {

     constructor(private readonly productvideoDatasource: ProductVideoDatasource) { }

     addProductVideo(addProductVideoDto: AddProductVideoDto): Promise<AddProductVideoEntity> {
          return this.productvideoDatasource.addProductVideo(addProductVideoDto);
     }

     deleteProductVideo(deleteProductVideoDto: DeleteProductVideoDto): Promise<DeleteProductVideoEntity> {
          return this.productvideoDatasource.deleteProductVideo(deleteProductVideoDto);
     }

     getProductVideos(): Promise<GetProductVideosEntity> {
          return this.productvideoDatasource.getProductVideos();
     }

}
