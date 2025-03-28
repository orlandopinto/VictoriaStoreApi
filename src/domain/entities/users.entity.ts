import { usersSchema } from "../../data/mongodb";
export class AddUserEntity {

	constructor(

		public _id: string,
		public userName: string,
		public email: string,
		public password: string,
		public firstName: string | null,
		public lastName: string | null,
		public phoneNumber: string | null,
		public mobileNumber: string,
		public birthday: Date | null,
		public public_id: string | null,
		public secure_url: string | null,
		public emailVerified: boolean,
		public gender: string | null,
		public shippingAddresses: string[] | null,
		public wishList: string[] | null

	) { }

}

export class UpdateUserEntity {

	constructor(
		public _id: string,
		public userName: string,
		public email: string,
		public password: string,
		public firstName: string | null,
		public lastName: string | null,
		public phoneNumber: string | null,
		public mobileNumber: string,
		public birthday: Date | null,
		public public_id: string | null,
		public secure_url: string | null,
		public emailVerified: boolean,
		public gender: string | null,
		public shippingAddresses: string[] | null,
		public wishList: string[] | null,
		public createdAt?: string,
		public updatedAt?: string
	) { }

}

export class DeleteUserEntity {

	constructor(public email: string) { }

}

export class GetUsersEntity {

	constructor(public users: [typeof usersSchema][]) { }

}

