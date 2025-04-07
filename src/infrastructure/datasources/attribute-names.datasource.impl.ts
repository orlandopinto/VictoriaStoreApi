import { AppLogger } from "../../config/appLogger";
import { AttributeNamesModel, attributeNamesSchema } from "../../data/mongodb";
import { AttributeNameDatasource } from "../../domain/datasources";
import { AddAttributeNameDto } from "../../domain/dtos/attributeNames/add-attribute-name.dto";
import { DeleteAttributeNameDto } from "../../domain/dtos/attributeNames/delete-attribute-name.dto";
import { UpdateAttributeNameDto } from "../../domain/dtos/attributeNames/update-attribute-name.dto";
import { AddAttributeNameEntity, DeleteAttributeNameEntity, GetAttributeNamesEntity, UpdateAttributeNameEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class AttributeNamesDatasourceImpl implements AttributeNameDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("AttributeNamesDatasourceImpl");
     }

     async addAttributeName(addAttributeNameDto: AddAttributeNameDto): Promise<AddAttributeNameEntity> {

          const { attributeName } = addAttributeNameDto;

          try {

               const attributes = await AttributeNamesModel.findOne({ attributeName: attributeName })
               if (attributes) throw CustomError.badRequest(`the Attribute "${attributeName}" already exists.`)
               const result = await AttributeNamesModel.create({ attributeName })
               await result.save();
               return new AddAttributeNameEntity(result._id.toString(), result.attributeName);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async updateAttributeName(updateAttributeNameDto: UpdateAttributeNameDto): Promise<UpdateAttributeNameEntity> {
          const { _id, attributeName } = updateAttributeNameDto;
          try {

               const attributes = await AttributeNamesModel.findOne({ _id: _id })
               if (!attributes) throw CustomError.badRequest('Attribute name does not exists.')

               const result = await AttributeNamesModel.findByIdAndUpdate(
                    _id,
                    {
                         attributeName
                    },
                    { new: true });

               if (!result)
                    throw CustomError.notFound('Attribute not found.');

               return new UpdateAttributeNameEntity(result._id.toString(), result.attributeName);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async deleteAttribute(deleteAttributeNameDto: DeleteAttributeNameDto): Promise<DeleteAttributeNameEntity> {

          const { _id } = deleteAttributeNameDto;
          try {
               const attributes = await AttributeNamesModel.findOne({ _id: _id })
               if (!attributes) throw CustomError.badRequest("Attribute does not exist or has been deleted.")
               await AttributeNamesModel.deleteOne({ _id: _id })
               return new DeleteAttributeNameEntity(attributes._id.toString(), attributes.attributeName);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getAttributeNames(): Promise<GetAttributeNamesEntity> {
          try {
               const result = await AttributeNamesModel.find() as unknown as [typeof attributeNamesSchema][]
               return new GetAttributeNamesEntity(result);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}
