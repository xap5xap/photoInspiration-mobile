import {PhotoOwner} from './photo-owner';
import {PhotoVisibility} from './photo-visibility';
import {PhotoDate} from './photo-date';
import {PhotoTag} from './photo-tag';
import {PhotoUrl} from './photo-url';

export class PhotoInfo {
    constructor(
        public id: string,
        public secret: string,
        public server: string,
        public farm: number,
        public dateuploaded: string,
        public isfavorite: number,
        public license: number,
        public safety_level: number,
        public rotation: number,
        public originalsecret: string,
        public originalformat: string,
        public owner: PhotoOwner,
        public title: string,
        public description: string,
        public visibility: PhotoVisibility,
        public dates: PhotoDate,
        public view: string,
        public tags: Array<PhotoTag>,
        public url: PhotoUrl,
        public stat: string
    ) { }

}
