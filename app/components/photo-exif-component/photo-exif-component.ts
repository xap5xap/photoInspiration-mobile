import {Component, OnInit, Input } from '@angular/core';
import {FlickrService} from '../../services/flickr.service';
import {Photo} from '../../models/photo';
import {PhotoExif} from '../../models/photo-exif';
/*
  Generated class for the PhotoExifComponent component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
    selector: 'photo-exif-component',
    templateUrl: 'build/components/photo-exif-component/photo-exif-component.html',
    providers: [FlickrService]
})
export class PhotoExifComponent {
    @Input()
    photo: Photo;
photoExif: PhotoExif;
    constructor(private flickrService: FlickrService) {

    }

    ngOnInit() {

        this.flickrService.getPhotoExif(this.photo).subscribe(
            photoExif => this.photoExif = photoExif
        );
    }

}
