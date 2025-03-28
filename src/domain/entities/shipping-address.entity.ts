import { shippingAddressSchema } from "../../data/mongodb/models/shipping-address.models";
export class AddShippingAddressEntity {

	constructor(

		public _id: string,
		public firstName: string,
		public lastName: string,
		public phoneNumber: string,
		public address: string,
		public province: string,
		public city: string,
		public state: string,
		public zipCode: string,
		public country: string,
		public isDefault: boolean

	) { }

}

export class UpdateShippingAddressEntity {

	constructor(

		public _id: string,
		public firstName: string,
		public lastName: string,
		public phoneNumber: string,
		public address: string,
		public province: string,
		public city: string,
		public state: string,
		public zipCode: string,
		public country: string,
		public isDefault: boolean

	) { }

}

export class DeleteShippingAddressEntity {

	constructor(public shippingaddressName: string) { }
	/*
	NOTE: Validar si el campo tiene el sufijo "Name"
	*/

}

export class GetShippingAddressesEntity {

	constructor(public shippingaddresses: [typeof shippingAddressSchema][]) { }

}

