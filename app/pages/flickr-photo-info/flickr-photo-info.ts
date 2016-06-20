import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {PhotoInfoComponent} from '../../components/photo-info/photo-info.component';
import {PhotoExifComponent} from '../../components/photo-exif-component/photo-exif-component';
import {Photo} from '../../models/photo';
import {PhotoFavorite} from '../../models/photo-favorite';

@Component({
    templateUrl: 'build/pages/flickr-photo-info/flickr-photo-info.html',
    directives: [PhotoInfoComponent, PhotoExifComponent]
})
export class FlickrPhotoInfoPage {
    photo: Photo;

    constructor(public nav: NavController,
        public viewCtrl: ViewController,
        params: NavParams) {
        this.photo = params.get("photo");
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
