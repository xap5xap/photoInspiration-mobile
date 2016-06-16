import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Photo} from '../../models/photo'

/*
  Generated class for the FlickrPhotoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/flickr-photo/flickr-photo.html',
})
export class FlickrPhotoPage {
    photo: Photo;
    isOnToolbar: boolean = false;

    constructor(public navParams: NavParams) {
        this.photo = navParams.data;
    }

    toogleToolbar() {
        this.isOnToolbar = !this.isOnToolbar;
    }
}
