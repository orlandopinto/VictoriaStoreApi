export class UpdateUserDto {

	private constructor(

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

	static update(object: { [key: string]: any }): [string?, UpdateUserDto?] {

		const requiredFields = ['_id', 'userName', 'email', 'password', 'firstName', 'lastName', 'phoneNumber', 'mobileNumber', 'birthday', 'public_id', 'secure_url', 'emailVerified', 'gender', 'shippingAddress', 'wishList'];
		for (const field of requiredFields) {
			if (object[field] === undefined) return [`Missing ${field} on update User`];
		}

		return [
			undefined,
			new UpdateUserDto(
				object._id,
				object.userName,
				object.email,
				object.password,
				object.firstName,
				object.lastName,
				object.phoneNumber,
				object.mobileNumber,
				object.birthday,
				object.public_id,
				object.secure_url,
				object.emailVerified,
				object.gender,
				object.shippingAddress,
				object.wishList
			)
		];
	}
}
