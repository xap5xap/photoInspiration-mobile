export class PhotoDate {
    constructor(
        public posted: string,
        public taken: string,
        public takenGranularity: number,
        public takenUnknown: number,
        public lastUpdate: string
    ) { }
}
