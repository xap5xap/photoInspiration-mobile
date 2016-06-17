export class PhotoFavorite {
    constructor(
        public id: string,
        public secret: string,
        public server: string,
        public farm: number,
        public page: number,
        public pages: number,
        public perPage: number,
        public total: string) {

    }
}
