export class FlickrError {
    constructor(
        public stat: string,
        public code: number,
        public message: string
    ) { }
}
