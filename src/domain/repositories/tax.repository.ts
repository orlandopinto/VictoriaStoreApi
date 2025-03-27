import { GetTaxesEntity } from "../entities";

export abstract class TaxRepository {

     abstract getTaxes(): Promise<GetTaxesEntity>

}