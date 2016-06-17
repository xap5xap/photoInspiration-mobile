import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {PhotoInfo} from '../../models/photo-info';
import {PhotoExif} from '../../models/photo-exif';
import {PhotoFavorite} from '../../models/photo-favorite';
/*
  Generated class for the FlickrPhotoInfoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/flickr-photo-info/flickr-photo-info.html',
})
export class FlickrPhotoInfoPage {
    photoInfo: PhotoInfo;
    photoFavorite: PhotoFavorite;
    photoExif: PhotoExif;

    constructor(public nav: NavController,
        public viewCtrl: ViewController,
        params: NavParams) {
        this.photoInfo = params.get("photoInfo");
        this.photoFavorite = params.get("photoFavorite")
        this.photoExif = params.get("photoExif");
        console.log(this.photoInfo);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
