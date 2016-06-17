export class Exif {
    constructor(
        public tag: string,
        public label: string,
        public raw: string,
        public clean: string
    ) { }
}
