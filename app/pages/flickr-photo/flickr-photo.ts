import {Component} from '@angular/core';
import {Modal, NavParams, NavController} from 'ionic-angular';
import {Photo} from '../../models/photo';
import {PhotoInfo} from '../../models/photo-info';
import {PhotoExif} from '../../models/photo-exif';
import {PhotoFavorite} from '../../models/photo-favorite';
import {FlickrPhotoInfoPage} from '../flickr-photo-info/flickr-photo-info';
import {FlickrService} from '../../services/flickr.service';

/*
  Generated class for the FlickrPhotoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/flickr-photo/flickr-photo.html',
    providers: [FlickrService]
})
export class FlickrPhotoPage {
    photo: Photo;
    isOnToolbar: boolean = false;
    photoInfo: PhotoInfo;
    photoFavorite: PhotoFavorite;
    photoExif: PhotoExif;

    constructor(public nav: NavController, public navParams: NavParams, private flickrService: FlickrService) {
        this.photo = navParams.data;
    }
    onPageLoaded() {
        this.flickrService.getPhotoInfo(this.photo).subscribe(
            photoInfo => this.photoInfo = photoInfo
        );
        this.flickrService.getFavorites(this.photo).subscribe(
            photoFavorite => this.photoFavorite = photoFavorite
        );
        this.flickrService.getPhotoExif(this.photo).subscribe(
            photoExif => this.photoExif = photoExif
        );
    }

    toogleToolbar() {
        this.isOnToolbar = !this.isOnToolbar;
    }

    openInfoModal() {
        let infoModal = Modal.create(FlickrPhotoInfoPage,
            { photoInfo: this.photoInfo, photoFavorite: this.photoFavorite, photoExif: this.photoExif });
        this.nav.present(infoModal);
    }
}
