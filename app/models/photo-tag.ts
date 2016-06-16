export class PhotoTag {
    constructor(
        public id: string,
        public author: string,
        public authorName: string,
        public raw: string,
        public content: string,
        public machineTag: number
    ) { }
}
