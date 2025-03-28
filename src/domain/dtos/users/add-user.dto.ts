
export class AddUserDto {
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

	static create(object: { [key: string]: any }): [string?, AddUserDto?] {
		const { _id, userName, email, password, firstName, lastName, phoneNumber, mobileNumber, birthday, public_id, secure_url, emailVerified, gender, shippingAddresses, wishList } = object;

		if (userName === undefined) return ['Missing userName on create users'];
		if (email === undefined) return ['Missing email on create users'];
		if (password === undefined) return ['Missing password on create users'];
		if (firstName === undefined) return ['Missing firstName on create users'];
		if (lastName === undefined) return ['Missing lastName on create users'];
		if (phoneNumber === undefined) return ['Missing phoneNumber on create users'];
		if (mobileNumber === undefined) return ['Missing mobileNumber on create users'];
		if (birthday === undefined) return ['Missing birthday on create users'];
		if (public_id === undefined) return ['Missing public_id on create users'];
		if (secure_url === undefined) return ['Missing secure_url on create users'];
		if (emailVerified === undefined) return ['Missing emailVerified on create users'];
		if (gender === undefined) return ['Missing gender on create users'];
		if (shippingAddresses === undefined) return ['Missing shippingAddresses on create users'];
		if (wishList === undefined) return ['Missing wishList on create users'];

		return [
			undefined,
			new AddUserDto(_id, userName, email, password, firstName, lastName, phoneNumber, mobileNumber, birthday, public_id, secure_url, emailVerified, gender, shippingAddresses, wishList)
		];
	}
}
