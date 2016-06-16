import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FlickrService} from '../../services/flickr.service';
import {PhotosResponse} from '../../models/photos-response'
import {Photo} from '../../models/photo'
import {FlickrPhotoPage} from '../flickr-photo/flickr-photo';

/*
  Generated class for the FlickrInterestingnessPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/flickr-interestingness/flickr-interestingness.html',
    providers: [FlickrService]
})
export class FlickrInterestingnessPage {

    photosResponse: PhotosResponse;
    page: number = 1;

    constructor(public nav: NavController, private flickrService: FlickrService) { }

    fillData(): boolean {
        return this.photosResponse ? true : false;
    }
    onPageLoaded() {
        this.loadInterestigness(null);
    }
    goToPhotoPage(photo: Photo) {
        this.nav.push(FlickrPhotoPage, photo);
    }

    loadInterestigness(infiniteScroll) {

        if ((this.photosResponse) && ((this.page - 1) === this.photosResponse.photos.pages)) {
            console.log('ya termino');
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            return;
        }
        this.flickrService.getInterestingness(this.page, this.photosResponse)
            .subscribe(data => {

                this.page = this.page + 1;
                this.photosResponse = data;
                //
                // console.log(`this.photosResponse ${this.photosResponse}`);
                // console.log(this.photosResponse);
                // console.log(`this.photosResponse.photos ${this.photosResponse.photos}`);
                console.log(this.photosResponse.photos);
                // console.log(`this.photosResponse.photos.page ${this.photosResponse.photos.page}`);
                // console.log(`this.photosResponse.stat ${this.photosResponse.stat}`);

                if (infiniteScroll) {
                    infiniteScroll.complete();
                }

            }
            );
    }
}
