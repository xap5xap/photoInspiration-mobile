import {Exif} from './exif';

export class PhotoExif {
    constructor(
        public id: string,
        public secret: string,
        public server: string,
        public farm: number,
        public camera: string,
        public exifInfo: Array<Exif>
    ) { }


    getExposure(): string {
        return this.getValue(this.find("ExposureTime"));
    }
    getFocalLenght(): string {
        return this.getValue(this.find("FocalLength"));
    }
    getAperture(): string {
        return this.getValue(this.find("FNumber"));
    }
    getISO(): string {
        let iso: string = this.getValue(this.find("ISO"));
        return iso.length > 0 ? "ISO " + iso : '';
    }
    private getValue(exif: Exif): string {
        return exif ? exif.clean || exif.raw : '';
    }

    private find(property: string): Exif {
        return this.exifInfo.find(exif => {
            return exif.tag === property;
        });
    }

}
