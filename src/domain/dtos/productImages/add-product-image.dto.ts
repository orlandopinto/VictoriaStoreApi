
export class AddProductImageDto {
    constructor(

        public _id: string,
        public public_id: string,
        public secure_url: string

    ) { }

    static create(object: { [key: string]: any }): [string?, AddProductImageDto?] {
        const { _id, public_id, secure_url } = object;

        if (public_id === undefined) return ['Missing public_id on create productimages'];
        if (secure_url === undefined) return ['Missing secure_url on create productimages'];

        return [
            undefined,
            new AddProductImageDto(_id, public_id, secure_url)
        ];
    }
}
