import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {PhotoFilter} from '../../models/photo-filter';
import {Utils} from '../../models/utils';
/*
  Generated class for the PhotoFilterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/photo-filter/photo-filter.html',
})
export class PhotoFilterPage {
    photoFilter: PhotoFilter;

    constructor(
        private navParams: NavParams,
        private viewCtrl: ViewController) {
        this.photoFilter = this.navParams.data;
    }

    applyFilters() {
        this.dismiss(this.photoFilter);
    }

    dismiss(data) {
        this.viewCtrl.dismiss(data);
    }

    maxDate(): string {
        return Utils.yesterdayDateFormated();                
    }
}
