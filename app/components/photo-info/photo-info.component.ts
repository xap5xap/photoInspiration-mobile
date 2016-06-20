import {Component, OnInit, Input } from '@angular/core';
import {PhotoInfo} from '../../models/photo-info';
import {PhotoFavorite} from '../../models/photo-favorite';
import {FlickrService} from '../../services/flickr.service';
import {Photo} from '../../models/photo';

@Component({
    selector: 'photo-info',
    templateUrl: 'build/components/photo-info/photo-info.component.html'
})
export class PhotoInfoComponent {
    @Input()
    photo: Photo;
    photoInfo: PhotoInfo;
    photoFavorite: PhotoFavorite;

    constructor(private flickrService: FlickrService) {
    }

    ngOnInit() {

        this.flickrService.getPhotoInfo(this.photo).subscribe(
            photoInfo => {
                this.photoInfo = photoInfo
            }
        );
        this.flickrService.getFavorites(this.photo).subscribe(
            photoFavorite => this.photoFavorite = photoFavorite
        );
    }
}
