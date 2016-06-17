import {Component} from '@angular/core';
import {Modal, NavParams, NavController} from 'ionic-angular';
import {Photo} from '../../models/photo';
import {FlickrPhotoInfoPage} from '../flickr-photo-info/flickr-photo-info';


/*
  Generated class for the FlickrPhotoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/flickr-photo/flickr-photo.html'
})
export class FlickrPhotoPage {
    photo: Photo;
    isOnToolbar: boolean = false;
  
    constructor(public nav: NavController, public navParams: NavParams) {
        this.photo = navParams.data;
    }
    onPageLoaded() {
    }

    toogleToolbar() {
        this.isOnToolbar = !this.isOnToolbar;
    }

    openInfoModal() {
        let infoModal = Modal.create(FlickrPhotoInfoPage,
            { photo: this.photo });
        this.nav.present(infoModal);
    }
}
